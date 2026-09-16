import { expect, it } from 'vitest';
import { assertScoredCatalogCoverage } from './catalog-coverage';

it('rejects missing, duplicate, or substituted routes before snapshot publication', () => {
  expect(() => assertScoredCatalogCoverage(['a', 'b'], ['b', 'a'])).not.toThrow();
  for (const result of [['a'], ['a', 'a'], ['a', 'c']]) {
    expect(() => assertScoredCatalogCoverage(['a', 'b'], result)).toThrow('Snapshot catalog mismatch');
  }
});
