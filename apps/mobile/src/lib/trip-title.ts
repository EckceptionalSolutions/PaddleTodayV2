/** The trip title has a smaller limit than the full route label. */
export function tripTitleForRoute(name: string) {
  const title = name.trim() || 'New paddle';
  if (title.length <= 160) return title;
  let shortened = title.slice(0, 159).trimEnd();
  if (/[\uD800-\uDBFF]$/.test(shortened)) shortened = shortened.slice(0, -1);
  return shortened + '…';
}
export function titleFollowsRoute(title: string, routeName: string) {
  return !title || title === 'New paddle' || title === routeName || title === tripTitleForRoute(routeName);
}
