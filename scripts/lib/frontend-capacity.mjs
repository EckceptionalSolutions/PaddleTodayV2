import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

/** Conservative decimal limits avoid relying on undocumented quota rounding. */
async function inventory(directory) {
  let files = 0, bytes = 0, largestFileBytes = 0;
  async function walk(path) {
    for (const entry of await readdir(path, { withFileTypes: true })) {
      const target = join(path, entry.name);
      if (entry.isDirectory()) await walk(target);
      else if (entry.isFile()) { const size = (await stat(target)).size; files++; bytes += size; largestFileBytes = Math.max(largestFileBytes, size); }
      else throw new Error('Frontend package contains an unsupported link or special file.');
    }
  }
  await walk(directory);
  return { files, bytes, largestFileBytes };
}

export async function verifyFrontendCapacity(directory, tier = 'Standard') {
  if (!['Free', 'Standard'].includes(tier)) throw new Error('Unknown Static Web Apps tier.');
  const { files, bytes } = await inventory(directory);
  const limitBytes = tier === 'Free' ? 250_000_000 : 500_000_000;
  if (!files || bytes > limitBytes) throw new Error(`Frontend package (${bytes} bytes) exceeds ${tier} deployment limits or is empty.`);
  return { tier, files, bytes, limitBytes, headroomBytes: limitBytes - bytes };
}

export async function verifyCloudflareFrontendCapacity(directory) {
  const result = await inventory(directory);
  // Workers Free supports 20,000 assets and 25 MiB per file. A conservative
  // decimal byte limit avoids any rounding dependency in the deployment gate.
  if (!result.files || result.files > 20_000 || result.largestFileBytes > 25_000_000) throw new Error('Frontend exceeds Workers Free file limits or is empty.');
  return { platform: 'Workers Free', ...result, maxFiles: 20_000, maxFileBytes: 25_000_000 };
}
