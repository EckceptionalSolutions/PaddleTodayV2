import { readFile, writeFile, rename, open, unlink } from 'node:fs/promises';
import { listAllRiversForAudit } from '../src/lib/rivers';
import { factFields, fingerprint, isSourceUrl, validateLedger, type FactField, type Ledger } from './lib/route-qa';

const args = process.argv.slice(2);
const value = (key: string) => args.find((arg) => arg.startsWith(`--${key}=`))?.slice(key.length + 3);
const route = listAllRiversForAudit().find((route) => [route.id, route.slug].includes(value('route') ?? ''));
const field = value('field') as FactField;
const verdict = value('verdict');
if (args.some((arg) => !/^--(route|field|verdict|source|note)=.+$/s.test(arg)) || !route || !factFields.includes(field) || !['supported', 'conflict'].includes(verdict ?? '') || !isSourceUrl(value('source') ?? '') || !value('note')?.trim()) throw new Error('Usage: npm run routes:qa:review -- --route=<slug> --field=<identity|access|distance|difficulty|hazards|permits|seasonality|gauge> --verdict=<supported|conflict> --source=https://... --note="Specific evidence supporting or contradicting the displayed facts"');
const file = 'docs/route-qa-evidence.json';
const lock = await open(`${file}.lock`, 'wx');
try {
  const ledger: Ledger = JSON.parse(await readFile(file, 'utf8'));
  validateLedger(ledger);
  ledger.reviews.push({ route: route.slug, field, fingerprint: fingerprint(route, field), verdict: verdict as 'supported' | 'conflict', sourceUrl: value('source')!, note: value('note')!.trim(), reviewedAt: new Date().toISOString() });
  await writeFile(`${file}.tmp`, JSON.stringify(ledger, null, 2) + '\n');
  await rename(`${file}.tmp`, file);
  console.log(`Recorded ${verdict} review for ${route.slug} / ${field}. Rerun routes:qa to update the report.`);
} finally { await lock.close(); await unlink(`${file}.lock`); }
