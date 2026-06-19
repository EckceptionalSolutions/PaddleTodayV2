import type { River } from "./types";

export type RouteSafetySeverity = "Critical" | "High" | "Medium" | "Low";

export interface RouteSafetyAuditIssue {
  routeId: string;
  slug: string;
  name: string;
  reach: string;
  state: string;
  severity: RouteSafetySeverity;
  category: string;
  message: string;
  evidence: string;
}

const severityRank: Record<RouteSafetySeverity, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

const hazardPatterns: Array<{
  category: string;
  severity: RouteSafetySeverity;
  pattern: RegExp;
  message: string;
}> = [
  {
    category: "Dam",
    severity: "Critical",
    pattern:
      /\b(?:low[- ]head dam|mandatory take[- ]out|take[- ]out .* dam|dam .* take[- ]out|dam-adjacent)\b/i,
    message:
      "Route text suggests a dam or mandatory take-out with high consequence if missed.",
  },
  {
    category: "Dam",
    severity: "High",
    pattern: /\b(?:dam|portage|hydro|release)\b/i,
    message: "Route text mentions dam, portage, hydro, or release hazards.",
  },
  {
    category: "Whitewater",
    severity: "High",
    pattern:
      /\b(?:whitewater|class ii|class iii|class iv|swiftwater|rapid|ledge|hydraulic)\b/i,
    message: "Route text mentions whitewater, swiftwater, or rapid hazards.",
  },
  {
    category: "Obstruction",
    severity: "High",
    pattern: /\b(?:strainer|logjam|log jam|wood|sweeper)\b/i,
    message: "Route text mentions wood or obstruction hazards.",
  },
  {
    category: "Access",
    severity: "High",
    pattern:
      /\b(?:closure|closed|private property|private bank|private banks|access uncertain|parking.*limited)\b/i,
    message:
      "Route text mentions closure, access uncertainty, or private-bank constraints.",
  },
  {
    category: "Conditions",
    severity: "Medium",
    pattern:
      /\b(?:cold water|fast rise|rises quickly|flashy|water quality|stormwater|urban)\b/i,
    message:
      "Route text mentions condition hazards that need explicit safety review.",
  },
  {
    category: "General hazard",
    severity: "Medium",
    pattern: /\b(?:danger|hazard|scout|caution)\b/i,
    message: "Route text includes general hazard language.",
  },
];

export function auditRouteSafety(rivers: River[]): RouteSafetyAuditIssue[] {
  const issues: RouteSafetyAuditIssue[] = [];

  for (const route of rivers) {
    const haystack = routeSafetyText(route);
    const safetyProfile = route.safetyProfile;

    if (route.routeType === "whitewater" && !safetyProfile) {
      issues.push(
        makeIssue(
          route,
          "High",
          "Missing safety profile",
          "Whitewater route is missing safetyProfile.",
          "routeType=whitewater",
        ),
      );
    }

    if (route.profile.difficulty === "hard" && !safetyProfile) {
      issues.push(
        makeIssue(
          route,
          "High",
          "Missing safety profile",
          "Hard route is missing safetyProfile.",
          "difficulty=hard",
        ),
      );
    }

    if (
      route.profile.thresholdModel === "minimum-only" &&
      !safetyProfile &&
      hazardPatterns.some((rule) => rule.pattern.test(haystack))
    ) {
      issues.push(
        makeIssue(
          route,
          "Medium",
          "Minimum-only hazard review",
          "Minimum-only route has hazard language but no safetyProfile.",
          matchingSnippet(haystack),
        ),
      );
    }

    for (const rule of hazardPatterns) {
      const match = haystack.match(rule.pattern);
      if (!match) {
        continue;
      }

      if (
        safetyProfile &&
        safetyProfile.reviewStatus === "reviewed" &&
        safetyProfile.riskLevel !== "standard"
      ) {
        continue;
      }

      if (
        safetyProfile &&
        safetyProfile.reviewStatus === "needs_review" &&
        rule.severity === "Critical"
      ) {
        issues.push(
          makeIssue(
            route,
            "High",
            "Safety review pending",
            "Route has structured safety warnings but still needs source-level review before the critical hazard is considered resolved.",
            matchingSnippet(haystack, match.index ?? 0),
          ),
        );
        continue;
      }

      issues.push(
        makeIssue(
          route,
          rule.severity,
          rule.category,
          rule.message,
          matchingSnippet(haystack, match.index ?? 0),
        ),
      );
    }
  }

  return dedupeIssues(issues).sort(
    (left, right) =>
      severityRank[right.severity] - severityRank[left.severity] ||
      left.state.localeCompare(right.state) ||
      left.name.localeCompare(right.name) ||
      left.reach.localeCompare(right.reach),
  );
}

export function routeSafetyAuditSummary(issues: RouteSafetyAuditIssue[]) {
  return issues.reduce<Record<RouteSafetySeverity, number>>(
    (summary, issue) => {
      summary[issue.severity] += 1;
      return summary;
    },
    { Critical: 0, High: 0, Medium: 0, Low: 0 },
  );
}

function routeSafetyText(route: River) {
  return [
    route.summary,
    route.statusText,
    route.profile.difficultyNotes,
    route.profile.confidenceNotes,
    route.logistics?.summary,
    route.logistics?.shuttle,
    route.logistics?.permits,
    route.logistics?.camping,
    ...(route.logistics?.accessCaveats ?? []),
    ...(route.logistics?.watchFor ?? []),
    ...route.evidenceNotes.flatMap((note) => [
      note.label,
      note.value,
      note.note,
    ]),
    ...route.sourceLinks.flatMap((link) => [link.label, link.url]),
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ");
}

function makeIssue(
  route: River,
  severity: RouteSafetySeverity,
  category: string,
  message: string,
  evidence: string,
): RouteSafetyAuditIssue {
  return {
    routeId: route.id,
    slug: route.slug,
    name: route.name,
    reach: route.reach,
    state: route.state,
    severity,
    category,
    message,
    evidence,
  };
}

function matchingSnippet(value: string, index = 0) {
  const start = Math.max(0, index - 80);
  const end = Math.min(value.length, index + 180);
  return value.slice(start, end).trim();
}

function dedupeIssues(issues: RouteSafetyAuditIssue[]) {
  const seen = new Set<string>();
  return issues.filter((issue) => {
    const key = `${issue.routeId}|${issue.category}|${issue.message}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
