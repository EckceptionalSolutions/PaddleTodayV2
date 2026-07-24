import { mkdir, readdir, rename, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const galleryDir = path.resolve(process.cwd(), 'public', 'gallery');
const writeChanges = process.argv.includes('--write');
const JPEG_MAX_DIMENSION = 2000;
const JPEG_MAX_BYTES = 1.5 * 1024 * 1024;
const OTHER_MAX_DIMENSION = 4096;
const OTHER_MAX_BYTES = 3 * 1024 * 1024;

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(filePath) : [filePath];
  }));
  return nested.flat();
}

async function optimizedJpeg(filePath) {
  return sharp(filePath, { failOn: 'warning' })
    .rotate()
    .resize({
      width: JPEG_MAX_DIMENSION,
      height: JPEG_MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 84,
      progressive: true,
      mozjpeg: true,
    })
    .toBuffer();
}

async function replaceFile(filePath, payload) {
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  await mkdir(path.dirname(temporaryPath), { recursive: true });
  await writeFile(temporaryPath, payload);
  try {
    await rename(temporaryPath, filePath);
  } catch (error) {
    await unlink(temporaryPath).catch(() => undefined);
    throw error;
  }
}

async function main() {
  const imageFiles = (await listFiles(galleryDir))
    .filter((filePath) => /\.(?:jpe?g|png|webp)$/i.test(filePath))
    .sort();
  const issues = [];
  let totalBytes = 0;
  let optimizedCount = 0;
  let bytesSaved = 0;

  for (const filePath of imageFiles) {
    let fileStats = await stat(filePath);
    let metadata;
    try {
      metadata = await sharp(filePath, { failOn: 'warning' }).metadata();
    } catch (error) {
      issues.push(`${path.relative(process.cwd(), filePath)} is not a readable image: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }

    const isJpeg = /\.jpe?g$/i.test(filePath);
    if (
      writeChanges
      && isJpeg
      && (fileStats.size > JPEG_MAX_BYTES || (metadata.width ?? 0) > JPEG_MAX_DIMENSION || (metadata.height ?? 0) > JPEG_MAX_DIMENSION)
    ) {
      const optimized = await optimizedJpeg(filePath);
      if (optimized.length < fileStats.size) {
        await replaceFile(filePath, optimized);
        optimizedCount += 1;
        bytesSaved += fileStats.size - optimized.length;
        fileStats = await stat(filePath);
        metadata = await sharp(filePath).metadata();
      }
    }

    totalBytes += fileStats.size;
    const maxBytes = isJpeg ? JPEG_MAX_BYTES : OTHER_MAX_BYTES;
    const maxDimension = isJpeg ? JPEG_MAX_DIMENSION : OTHER_MAX_DIMENSION;
    if (fileStats.size > maxBytes) {
      issues.push(`${path.relative(process.cwd(), filePath)} is ${formatMiB(fileStats.size)}; limit is ${formatMiB(maxBytes)}.`);
    }
    if ((metadata.width ?? 0) > maxDimension || (metadata.height ?? 0) > maxDimension) {
      issues.push(
        `${path.relative(process.cwd(), filePath)} is ${metadata.width ?? '?'}x${metadata.height ?? '?'}; `
        + `maximum dimension is ${maxDimension}px.`,
      );
    }
  }

  if (issues.length > 0) {
    throw new Error(`Gallery image audit failed with ${issues.length} issue(s):\n${issues.join('\n')}`);
  }

  console.log(
    `Gallery image audit passed for ${imageFiles.length} images (${formatMiB(totalBytes)} total).`
    + (writeChanges ? ` Optimized ${optimizedCount}; saved ${formatMiB(bytesSaved)}.` : ''),
  );
}

function formatMiB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
