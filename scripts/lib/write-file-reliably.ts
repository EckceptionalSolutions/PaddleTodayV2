import { rename, rm, writeFile, type WriteFileOptions } from 'node:fs/promises';

const transientWindowsFileCodes = new Set([
  'EACCES',
  'EBUSY',
  'EMFILE',
  'ENFILE',
  'EPERM',
  'UNKNOWN',
]);

function errorCode(error: unknown): string | null {
  if (!error || typeof error !== 'object' || !('code' in error)) return null;
  return typeof error.code === 'string' ? error.code : null;
}

async function retryTransientFileOperation(operation: () => Promise<void>, attempts = 24) {
  let delayMilliseconds = 25;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await operation();
      return;
    } catch (error) {
      const code = errorCode(error);
      if (!code || !transientWindowsFileCodes.has(code) || attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
      delayMilliseconds = Math.min(400, Math.round(delayMilliseconds * 1.6));
    }
  }
}

/**
 * Replaces a generated artifact atomically and tolerates short-lived Windows
 * sharing/virus-scanner locks. The temporary file lives beside the target so
 * the final rename remains on the same volume.
 */
export async function writeFileReliably(
  filePath: string,
  data: string | Uint8Array,
  options?: WriteFileOptions,
) {
  const temporaryPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryPath, data, options);
  try {
    await retryTransientFileOperation(() => rename(temporaryPath, filePath));
  } finally {
    await rm(temporaryPath, { force: true }).catch(() => undefined);
  }
}
