interface StaticRouteRule {
  route: string;
  redirect?: string;
  statusCode?: number;
}

export function staticRoutePatternErrors(rules: StaticRouteRule[]): string[] {
  const errors: string[] = [];
  const patterns = new Map<string, StaticRouteRule>();
  for (const rule of rules) {
    const pattern = rule.route.replace(/\/$/, '') || '/';
    const previous = patterns.get(pattern);
    // Azure rejects normalized duplicates even when redirect targets agree.
    if (previous) errors.push(`Duplicate static route pattern: ${previous.route} and ${rule.route}`);
    patterns.set(pattern, rule);
  }
  return errors;
}
