import { describe, expect, it } from 'vitest';
import { planRegistryImports, verifyRegistryCopy } from './registry-consolidation.mjs';
const a = 'sha256:' + 'a'.repeat(64), b = 'sha256:' + 'b'.repeat(64);
const manifest = (digest: string, tags: string[]) => ({ digest, tags, mediaType: 'application/vnd.docker.distribution.manifest.v2+json' });
describe('registry copy safety', () => {
  it('preserves every tag and gives untagged rollback manifests a stable migration tag', () => {
    const plan = planRegistryImports([manifest(a,['current','rollback']),manifest(b,[])],[]);
    expect(plan[0].missingTags).toEqual(['current','rollback']);
    expect(plan[1].missingTags).toEqual(['migrated-'+'b'.repeat(64)]);
  });
  it('resumes without reimporting matching digests and tags', () => {
    expect(planRegistryImports([manifest(a,['current','rollback'])],[manifest(a,['current'])])[0].missingTags).toEqual(['rollback']);
    expect(verifyRegistryCopy([manifest(a,['current'])],[manifest(a,['current'])])).toEqual({manifestsVerified:1,tagsVerified:1});
  });
  it('refuses conflicting tags, missing copies, empty inventories, and unsupported artifacts', () => {
    expect(()=>planRegistryImports([manifest(a,['current'])],[manifest(b,['current'])])).toThrow('overwrite');
    expect(()=>verifyRegistryCopy([manifest(a,['current'])],[])).toThrow('missing');
    expect(()=>planRegistryImports([],[])).toThrow('empty');
    expect(()=>planRegistryImports([{...manifest(a,[]),mediaType:'unsupported'}],[])).toThrow('Unsupported');
  });
});
