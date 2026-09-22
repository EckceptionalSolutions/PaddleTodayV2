/** Six decimal places retain sub-foot map precision without floating-point tails. */
export function compactGeometryCoordinates(lines: number[][][]): number[][][] {
  return lines.map(line => line.map(point => point.map(value => Number(value.toFixed(6)))));
}
