interface StaticRouteRule {
  route: string;
  redirect?: string;
  statusCode?: number;
}

export function staticRoutePatternErrors(rules: StaticRouteRule[]): string[] {
  const errors: string[] = [];
  const literals = new Set<string>();
  const patterns = new Map<string, StaticRouteRule>();
  for (const rule of rules) {
    const pattern = rule.route.replace(/\/$/, '') || '/';
    const previous = patterns.get(pattern);
    // Azure matches explicit slash forms separately. Permit only agreeing
    // redirect pairs; duplicate literals and conflicting rules remain errors.
    if (literals.has(rule.route) || (previous && (!rule.redirect
      || previous.redirect !== rule.redirect || previous.statusCode !== rule.statusCode))) {
      errors.push(`Duplicate or conflicting static route pattern: ${previous?.route ?? rule.route} and ${rule.route}`);
    }
    literals.add(rule.route);
    patterns.set(pattern, rule);
  }
  return errors;
}
