/** Firebase selects its default Hosting domain when linkDomain is omitted. */
export function emailLinkDomainOption(domain: string | undefined): { linkDomain?: string } {
  const value = domain?.trim();
  if (!value || /(?:^|\.)(?:firebaseapp\.com|web\.app)$/i.test(value)) return {};
  return { linkDomain: value };
}
