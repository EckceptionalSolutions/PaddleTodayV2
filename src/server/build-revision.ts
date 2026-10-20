// Replaced with a literal by the API packager. Source-mode development is unversioned.
// Reading a mutable file or process environment here could make an old worker
// appear to serve a newly uploaded release.
declare const __PADDLETODAY_API_REVISION__: string | null;
export const apiBuildRevision = typeof __PADDLETODAY_API_REVISION__ === 'string'
  ? __PADDLETODAY_API_REVISION__
  : null;
