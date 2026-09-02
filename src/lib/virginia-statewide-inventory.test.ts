import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

type VirginiaInventory = {
  stateId: string;
  statewideDwrAccess: {
    featureCount: number;
    rawDistinctWaterbodyLabelCount: number;
    normalizedWaterbodyGroupCount: number;
    accessSites: Array<{ objectId: number; waterbody: string; latitude: number | null; longitude: number | null }>;
  };
  statewideDwrRiverCatalog: Array<{ name: string; url: string }>;
  reconciliation: {
    currentVirginiaRouteCount: number;
    currentVirginiaCandidateCount: number;
    dwrRiverCatalogCount: number;
    dwrRiverCatalogWithoutRouteCandidateOrGaugeReview: string[];
    dwrRiverCatalogWithoutRouteCandidateGaugeReviewOrDisposition: string[];
    pendingRouteCandidateWaterbodies: string[];
    unreconciledMovingWaterLabels: string[];
  };
};

const inventory = JSON.parse(
  readFileSync('docs/operations/virginia-statewide-inventory.json', 'utf8'),
) as VirginiaInventory;

describe('Virginia statewide inventory artifact', () => {
  it('retains the complete statewide DWR access baseline without duplicate features', () => {
    const ids = inventory.statewideDwrAccess.accessSites.map((site) => site.objectId);
    const labels = new Set(inventory.statewideDwrAccess.accessSites.map((site) => site.waterbody));

    expect(inventory.stateId).toBe('VA');
    expect(inventory.statewideDwrAccess.featureCount).toBe(inventory.statewideDwrAccess.accessSites.length);
    expect(new Set(ids).size).toBe(ids.length);
    expect(inventory.statewideDwrAccess.rawDistinctWaterbodyLabelCount).toBe(labels.size);
    expect(inventory.statewideDwrAccess.normalizedWaterbodyGroupCount).toBeGreaterThan(0);
    expect(inventory.statewideDwrAccess.accessSites.every((site) => (
      Number.isFinite(site.latitude) && Number.isFinite(site.longitude)
    ))).toBe(true);
  });

  it('records the independent DWR river catalog and closes every discovered moving-water gap', () => {
    expect(inventory.statewideDwrRiverCatalog.length).toBeGreaterThanOrEqual(40);
    expect(inventory.reconciliation.dwrRiverCatalogCount).toBe(inventory.statewideDwrRiverCatalog.length);
    expect(inventory.statewideDwrRiverCatalog.every((river) => river.name && river.url.startsWith('https://'))).toBe(true);
    expect(inventory.reconciliation.currentVirginiaRouteCount).toBeGreaterThan(0);
    expect(inventory.reconciliation.currentVirginiaCandidateCount).toBeGreaterThan(0);
    expect(inventory.reconciliation.dwrRiverCatalogWithoutRouteCandidateOrGaugeReview.length).toBeGreaterThan(0);
    expect(inventory.reconciliation.dwrRiverCatalogWithoutRouteCandidateGaugeReviewOrDisposition).toEqual([]);
    expect(inventory.reconciliation.pendingRouteCandidateWaterbodies).toEqual([]);
    expect(inventory.reconciliation.unreconciledMovingWaterLabels).toEqual([]);
  });
});
