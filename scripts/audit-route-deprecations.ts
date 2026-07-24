import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

type DeprecationRow = {
  corridorId: string;
  canonicalSlug: string | null;
  status: 'observe' | 'recommend' | 'deprecate' | 'archive';
  underlyingTripOptionsPreserved: boolean;
  conversionBaseline: number | null;
  conversionPilot: number | null;
  safetyReview: string;
};

const root = process.cwd();

async function main() {
  const rows = JSON.parse(await readFile(join(root, 'docs', 'route-deprecation-ledger.json'), 'utf8')) as DeprecationRow[];
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const row of rows) {
    if (ids.has(row.corridorId)) errors.push(`Duplicate deprecation row: ${row.corridorId}`);
    ids.add(row.corridorId);
    if (!row.underlyingTripOptionsPreserved) errors.push(`${row.corridorId} does not preserve underlying trip options.`);
    if (row.status === 'archive' && (row.conversionBaseline === null || row.conversionPilot === null || row.safetyReview !== 'approved')) {
      errors.push(`${row.corridorId} cannot be archived without conversion evidence and approved safety review.`);
    }
    if (row.status !== 'observe' && row.status !== 'recommend' && row.status !== 'deprecate' && row.status !== 'archive') errors.push(`${row.corridorId} has an invalid status.`);
  }
  if (errors.length) throw new Error(`Route deprecation audit failed:\n- ${errors.join('\n- ')}`);
  console.log(`Route deprecation audit passed: ${rows.length} ledger rows; no premature archives.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
