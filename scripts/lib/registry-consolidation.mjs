const digestPattern = /^sha256:[a-f0-9]{64}$/;
const tagPattern = /^[\w][\w.-]{0,127}$/;

export function planRegistryImports(source, destination) {
  if (!Array.isArray(source) || !source.length || !Array.isArray(destination)) throw new Error('Registry inventories must be complete arrays; source must not be empty.');
  const targetTags = new Map();
  for (const manifest of destination) for (const tag of manifest.tags ?? []) targetTags.set(tag, manifest.digest);
  const sourceTags = new Map();
  return source.map(manifest => {
    if (!digestPattern.test(manifest.digest)) throw new Error('Invalid source manifest digest.');
    if (manifest.mediaType !== 'application/vnd.docker.distribution.manifest.v2+json') {
      throw new Error(`Unsupported manifest type: ${manifest.mediaType}. Preserve it separately before retirement.`);
    }
    const tags = manifest.tags?.length ? manifest.tags : [`migrated-${manifest.digest.slice(7)}`];
    for (const tag of tags) {
      if (!tagPattern.test(tag)) throw new Error('Invalid registry tag.');
      if (sourceTags.has(tag) && sourceTags.get(tag) !== manifest.digest) throw new Error(`Conflicting source tag: ${tag}`);
      sourceTags.set(tag, manifest.digest);
      if (targetTags.has(tag) && targetTags.get(tag) !== manifest.digest) throw new Error(`Refusing to overwrite destination tag: ${tag}`);
    }
    return { digest: manifest.digest, tags, missingTags: tags.filter(tag => targetTags.get(tag) !== manifest.digest) };
  });
}

export function verifyRegistryCopy(source, destination) {
  const pending = planRegistryImports(source, destination).filter(item => item.missingTags.length);
  if (pending.length) throw new Error(`${pending.length} source manifests still have missing destination tags.`);
  return { manifestsVerified: source.length, tagsVerified: source.reduce((count, manifest) => count + Math.max(1, manifest.tags?.length ?? 0), 0) };
}
