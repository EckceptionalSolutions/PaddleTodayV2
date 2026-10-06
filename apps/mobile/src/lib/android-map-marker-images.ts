// Android uses bundled SDK marker images. Other platforms retain native views.
export function androidMarkerImage(_rating: string | null | undefined, _label = 'dot'): number | undefined {
  return undefined;
}
export function androidUserMarkerImage(): number | undefined {
  return undefined;
}
