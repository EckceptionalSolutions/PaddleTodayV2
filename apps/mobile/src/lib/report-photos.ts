import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import type { SelectedReportPhoto } from '../components/route-report-sheet';

export const ROUTE_REPORT_MAX_PHOTOS = 4;
export const ROUTE_REPORT_MAX_PHOTO_BYTES = 4 * 1024 * 1024;
export const ROUTE_REPORT_ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ROUTE_REPORT_MAX_IMAGE_EDGE = 1600;
const ROUTE_REPORT_IMAGE_QUALITY = 0.8;

export async function normalizeReportPhotoAsset(asset: ImagePicker.ImagePickerAsset, index: number): Promise<SelectedReportPhoto | null> {
  const type = normalizeImageMimeType(asset.mimeType, asset.fileName, asset.uri);

  if (!type || !ROUTE_REPORT_ALLOWED_IMAGE_TYPES.has(type)) {
    return null;
  }

  const optimized = await optimizeReportPhoto(asset);
  const base64 = optimized.base64?.startsWith('data:') ? optimized.base64.split(',').pop() ?? '' : optimized.base64 ?? '';
  const size = estimateBase64ByteSize(base64);

  if (!Number.isFinite(size) || size <= 0 || size > ROUTE_REPORT_MAX_PHOTO_BYTES) {
    return null;
  }

  if (!base64) {
    return null;
  }

  const name = normalizedPhotoName(asset.fileName, index);

  return {
    id: `${asset.assetId ?? asset.uri}-${Date.now()}-${index}`,
    uri: optimized.uri,
    name,
    type: 'image/jpeg',
    size,
    dataUrl: `data:image/jpeg;base64,${base64}`,
  };
}

async function optimizeReportPhoto(asset: ImagePicker.ImagePickerAsset) {
  const width = asset.width ?? 0;
  const height = asset.height ?? 0;
  const maxEdge = Math.max(width, height);
  const resize = maxEdge > ROUTE_REPORT_MAX_IMAGE_EDGE
    ? width >= height
      ? { width: ROUTE_REPORT_MAX_IMAGE_EDGE }
      : { height: ROUTE_REPORT_MAX_IMAGE_EDGE }
    : undefined;

  return ImageManipulator.manipulateAsync(
    asset.uri,
    resize ? [{ resize }] : [],
    {
      compress: ROUTE_REPORT_IMAGE_QUALITY,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    }
  );
}

function normalizedPhotoName(fileName: string | null | undefined, index: number) {
  const source = fileName?.trim();
  if (!source) {
    return `route-photo-${index + 1}.jpg`;
  }

  return source.replace(/\.(png|webp|jpe?g)$/i, '.jpg');
}

function normalizeImageMimeType(
  mimeType: string | null | undefined,
  fileName: string | null | undefined,
  uri: string
) {
  const normalized = mimeType?.toLowerCase();
  if (normalized && ROUTE_REPORT_ALLOWED_IMAGE_TYPES.has(normalized)) {
    return normalized;
  }

  const source = (fileName || uri).toLowerCase();
  if (source.endsWith('.png')) return 'image/png';
  if (source.endsWith('.webp')) return 'image/webp';
  if (source.endsWith('.jpg') || source.endsWith('.jpeg')) return 'image/jpeg';
  return null;
}

function estimateBase64ByteSize(base64: string | null | undefined) {
  if (!base64) {
    return 0;
  }

  const encoded = base64.startsWith('data:') ? base64.split(',').pop() ?? '' : base64;
  const padding = encoded.endsWith('==') ? 2 : encoded.endsWith('=') ? 1 : 0;
  return Math.floor((encoded.length * 3) / 4) - padding;
}
