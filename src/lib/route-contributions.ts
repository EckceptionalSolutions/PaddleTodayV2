import { randomUUID, createHmac, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  blobUrl,
  cleanBlobPath as cleanPathSegment,
  createJsonStorage,
  mutateJson,
  parseContainerSas,
} from './blob-storage';
import type { JsonStorage } from './blob-storage';
import {
  isArrayOf,
  isBoolean,
  isOptionalString,
  isRecord,
  isNumber,
  isString,
} from './json-guards';
import type { ScoringOutcomeObservationInput } from '@paddletoday/api-contract';
import { parseScoringOutcomeObservation } from './scoring-outcomes';

const DEFAULT_CONTRIBUTIONS_DIR = '.local';
const ROUTE_CONTRIBUTIONS_PREFIX = cleanPathSegment(process.env.ROUTE_CONTRIBUTIONS_BLOB_PREFIX || 'route-contributions');
const ADMIN_SESSION_COOKIE = 'pt_admin';
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

export interface RouteContributionStoredFile {
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  blobName: string;
  caption?: string;
}

export interface RouteContributionSubmission {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  reviewNote: string;
  river: {
    slug: string;
    name: string;
    reach: string;
    state: string;
    region: string;
  };
  contributor: {
    name: string;
    email: string;
  };
  trip: {
    date: string;
    sentiment: string;
    report: string;
  };
  notes: string;
  scoringOutcome?: ScoringOutcomeObservationInput;
  rightsConfirmed: boolean;
  reviewConsent: boolean;
  files: RouteContributionStoredFile[];
  meta: {
    ip: string;
    ua: string;
    referer: string;
  };
}

interface RouteContributionIndex {
  submissions: RouteContributionSubmission[];
}

export interface ApprovedCommunityPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  takenLabel?: string;
  approvedAt: string;
  sourceSubmissionId: string;
}

export interface ApprovedTripReport {
  id: string;
  approvedAt: string;
  sourceSubmissionId: string;
  contributorName: string;
  tripDate: string;
  sentiment: string;
  report: string;
  notes: string;
  photos?: ApprovedCommunityPhoto[];
}

interface ApprovedCommunityStore {
  photos: ApprovedCommunityPhoto[];
  reports: ApprovedTripReport[];
}

type BinaryStorage = JsonStorage & {
  readBytes(blobName: string): Promise<{ buffer: Buffer; contentType: string | null } | null>;
  writeBytes(blobName: string, value: Buffer, contentType: string): Promise<void>;
  deleteBlob(blobName: string): Promise<void>;
};

function isRouteContributionStoredFile(value: unknown): value is RouteContributionStoredFile {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.fileName) &&
    isString(value.originalName) &&
    isString(value.mimeType) &&
    isNumber(value.size) &&
    isString(value.blobName) &&
    isOptionalString(value.caption)
  );
}

function isRouteContributionSubmission(value: unknown): value is RouteContributionSubmission {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    ['pending', 'approved', 'rejected'].includes(String(value.status)) &&
    isString(value.submittedAt) &&
    (value.reviewedAt === null || isString(value.reviewedAt)) &&
    (value.reviewedBy === null || isString(value.reviewedBy)) &&
    isString(value.reviewNote) &&
    isRecord(value.river) &&
    isString(value.river.slug) &&
    isString(value.river.name) &&
    isString(value.river.reach) &&
    isString(value.river.state) &&
    isString(value.river.region) &&
    isRecord(value.contributor) &&
    isString(value.contributor.name) &&
    isString(value.contributor.email) &&
    isRecord(value.trip) &&
    isString(value.trip.date) &&
    isString(value.trip.sentiment) &&
    isString(value.trip.report) &&
    isString(value.notes) &&
    (value.scoringOutcome === undefined || parseScoringOutcomeObservation(value.scoringOutcome).ok) &&
    isBoolean(value.rightsConfirmed) &&
    isBoolean(value.reviewConsent) &&
    isArrayOf(value.files, isRouteContributionStoredFile) &&
    isRecord(value.meta) &&
    isString(value.meta.ip) &&
    isString(value.meta.ua) &&
    isString(value.meta.referer)
  );
}

function isRouteContributionIndex(value: unknown): value is RouteContributionIndex {
  return isRecord(value) && isArrayOf(value.submissions, isRouteContributionSubmission);
}

function isApprovedCommunityPhoto(value: unknown): value is ApprovedCommunityPhoto {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.src) &&
    isString(value.alt) &&
    isString(value.caption) &&
    isOptionalString(value.credit) &&
    isOptionalString(value.takenLabel) &&
    isString(value.approvedAt) &&
    isString(value.sourceSubmissionId)
  );
}

function isApprovedTripReport(value: unknown): value is ApprovedTripReport {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.approvedAt) &&
    isString(value.sourceSubmissionId) &&
    isString(value.contributorName) &&
    isString(value.tripDate) &&
    isString(value.sentiment) &&
    isString(value.report) &&
    isString(value.notes) &&
    (value.photos === undefined || isArrayOf(value.photos, isApprovedCommunityPhoto))
  );
}

function isContributionStorageValue(
  value: unknown
): value is RouteContributionIndex | RouteContributionSubmission | ApprovedCommunityPhoto[] | ApprovedTripReport[] {
  return (
    isRouteContributionIndex(value) ||
    isRouteContributionSubmission(value) ||
    isArrayOf(value, isApprovedCommunityPhoto) ||
    isArrayOf(value, isApprovedTripReport)
  );
}

export async function createRouteContributionSubmission(args: {
  river: RouteContributionSubmission['river'];
  contributor: RouteContributionSubmission['contributor'];
  trip: RouteContributionSubmission['trip'];
  notes: string;
  scoringOutcome?: ScoringOutcomeObservationInput;
  rightsConfirmed: boolean;
  reviewConsent: boolean;
  files: Array<{
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number;
    buffer: Buffer;
    caption?: string;
  }>;
  meta: RouteContributionSubmission['meta'];
}) {
  const storage = contributionsStorage();
  const id = `contribution_${randomUUID()}`;
  const storedFiles: RouteContributionStoredFile[] = [];

  for (const file of args.files) {
    const blobName = submissionFileBlobName(id, file.fileName);
    await storage.writeBytes(blobName, file.buffer, file.mimeType);
    storedFiles.push({
      fileName: file.fileName,
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      blobName,
      caption: file.caption?.trim() || '',
    });
  }

  const submission: RouteContributionSubmission = {
    id,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
    reviewedBy: null,
    reviewNote: '',
    river: args.river,
    contributor: args.contributor,
    trip: args.trip,
    notes: args.notes,
    ...(args.scoringOutcome ? { scoringOutcome: args.scoringOutcome } : {}),
    rightsConfirmed: args.rightsConfirmed,
    reviewConsent: args.reviewConsent,
    files: storedFiles,
    meta: args.meta,
  };

  await storage.writeJson(submissionBlobName(id), submission);
  await mutateJson({
    storage,
    blobName: indexBlobName(),
    initial: { submissions: [] } as RouteContributionIndex,
    mutate: (index) => {
      index.submissions.unshift(submission);
      return index;
    },
  });

  return { submission, storage: storage.kind };
}

export async function listRouteContributionSubmissions(args: {
  status?: RouteContributionSubmission['status'];
} = {}) {
  const index = (await contributionsStorage().readJson<RouteContributionIndex>(indexBlobName())) ?? { submissions: [] };
  const filtered = args.status ? index.submissions.filter((item) => item.status === args.status) : index.submissions;
  return filtered.sort((left, right) => right.submittedAt.localeCompare(left.submittedAt));
}

export async function getRouteContributionSubmission(id: string) {
  return contributionsStorage().readJson<RouteContributionSubmission>(submissionBlobName(id));
}

/** Remove a submission, its source files, and any approved derivatives. */
export async function deleteRouteContributionSubmission(id: string) {
  if (!isSafeSubmissionId(id)) return false;

  const storage = contributionsStorage();
  const submission = await storage.readJson<RouteContributionSubmission>(submissionBlobName(id));
  const index = await storage.readJson<RouteContributionIndex>(indexBlobName());
  if (!submission && !index?.submissions.some((item) => item.id === id)) return false;

  const sourceFiles = submission?.files ?? [];
  await Promise.all([
    storage.deleteBlob(submissionBlobName(id)),
    ...sourceFiles.map((file) => storage.deleteBlob(file.blobName)),
  ]);

  if (submission?.status === 'approved') {
    await Promise.all([
      mutateJson({
        storage,
        blobName: approvedPhotosBlobName(submission.river.slug),
        initial: [] as ApprovedCommunityPhoto[],
        mutate: (photos) => photos.filter((item) => item.sourceSubmissionId !== id),
      }),
      mutateJson({
        storage,
        blobName: approvedReportsBlobName(submission.river.slug),
        initial: [] as ApprovedTripReport[],
        mutate: (reports) => reports.filter((item) => item.sourceSubmissionId !== id),
      }),
      ...sourceFiles.map((file) => storage.deleteBlob(approvedPhotoBlobName(submission.river.slug, id, file.fileName))),
    ]);
  }

  await mutateJson({
    storage,
    blobName: indexBlobName(),
    initial: { submissions: [] } as RouteContributionIndex,
    mutate: (latestIndex) => {
      latestIndex.submissions = latestIndex.submissions.filter((item) => item.id !== id);
      return latestIndex;
    },
  });

  return true;
}

export async function getApprovedCommunityForRoute(slug: string): Promise<ApprovedCommunityStore> {
  const storage = contributionsStorage();
  const [photos, reports] = await Promise.all([
    storage.readJson<ApprovedCommunityPhoto[]>(approvedPhotosBlobName(slug)),
    storage.readJson<ApprovedTripReport[]>(approvedReportsBlobName(slug)),
  ]);

  return {
    photos: (photos ?? []).sort((left, right) => right.approvedAt.localeCompare(left.approvedAt)),
    reports: (reports ?? []).sort((left, right) => right.approvedAt.localeCompare(left.approvedAt)),
  };
}

export async function reviewRouteContributionSubmission(args: {
  id: string;
  action: 'approve' | 'reject';
  reviewer: string;
  note?: string;
}) {
  const storage = contributionsStorage();
  const index = (await storage.readJson<RouteContributionIndex>(indexBlobName())) ?? { submissions: [] };
  const indexItem = index.submissions.find((item) => item.id === args.id);
  if (!indexItem) {
    return null;
  }

  const submission = (await storage.readJson<RouteContributionSubmission>(submissionBlobName(args.id))) ?? indexItem;
  const reviewedAt = new Date().toISOString();
  submission.status = args.action === 'approve' ? 'approved' : 'rejected';
  submission.reviewedAt = reviewedAt;
  submission.reviewedBy = args.reviewer;
  submission.reviewNote = args.note?.trim() || '';

  Object.assign(indexItem, submission);
  await storage.writeJson(submissionBlobName(args.id), submission);

  if (args.action === 'approve') {
    await approveContributionAssets(storage, submission, reviewedAt);
  } else {
    await removeApprovedContributionAssets(storage, submission);
  }

  await mutateJson({
    storage,
    blobName: indexBlobName(),
    initial: { submissions: [] } as RouteContributionIndex,
    mutate: (latestIndex) => {
      const latestItem = latestIndex.submissions.find((item) => item.id === args.id);
      if (latestItem) Object.assign(latestItem, submission);
      return latestIndex;
    },
  });
  return submission;
}

async function approveContributionAssets(storage: BinaryStorage, submission: RouteContributionSubmission, approvedAt: string) {
  const community = await getApprovedCommunityForRoute(submission.river.slug);
  const approvedSubmissionPhotos: ApprovedCommunityPhoto[] = [];

  for (const file of submission.files) {
    const alreadyApproved = community.photos.some((item) => item.sourceSubmissionId === submission.id && item.id === `${submission.id}-${file.fileName}`);
    if (alreadyApproved) {
      const existing = community.photos.find((item) => item.sourceSubmissionId === submission.id && item.id === `${submission.id}-${file.fileName}`);
      if (existing) {
        approvedSubmissionPhotos.push(existing);
      }
      continue;
    }

    const bytes = await storage.readBytes(file.blobName);
    if (!bytes) continue;

    const approvedBlobName = approvedPhotoBlobName(submission.river.slug, submission.id, file.fileName);
    await storage.writeBytes(approvedBlobName, bytes.buffer, file.mimeType);

    const approvedPhoto = {
      id: `${submission.id}-${file.fileName}`,
      src: communityPhotoUrl(submission.river.slug, submission.id, file.fileName),
      alt: file.caption?.trim() || `${submission.river.name} photo from ${submission.contributor.name}`,
      caption:
        file.caption?.trim() ||
        submission.notes ||
        submission.trip.report.slice(0, 140) ||
        `${submission.river.name} route photo`,
      credit: submission.contributor.name,
      takenLabel: submission.trip.date ? `Taken ${submission.trip.date}` : '',
      approvedAt,
      sourceSubmissionId: submission.id,
    };
    approvedSubmissionPhotos.push(approvedPhoto);
  }

  const reportText = submission.trip.report.trim();
  const approvedReport: ApprovedTripReport | null = reportText.length >= 12 && !community.reports.some((item) => item.sourceSubmissionId === submission.id)
    ? {
      id: `${submission.id}-report`,
      approvedAt,
      sourceSubmissionId: submission.id,
      contributorName: submission.contributor.name,
      tripDate: submission.trip.date,
      sentiment: submission.trip.sentiment,
      report: reportText,
      notes: submission.notes,
      photos: approvedSubmissionPhotos,
    }
    : null;

  await mutateJson({
    storage,
    blobName: approvedPhotosBlobName(submission.river.slug),
    initial: [] as ApprovedCommunityPhoto[],
    mutate: (photos) => {
      const existingIds = new Set(photos.map((photo) => photo.id));
      return [...photos, ...approvedSubmissionPhotos.filter((photo) => !existingIds.has(photo.id))];
    },
  });
  if (approvedReport) {
    await mutateJson({
      storage,
      blobName: approvedReportsBlobName(submission.river.slug),
      initial: [] as ApprovedTripReport[],
      mutate: (reports) => reports.some((report) => report.sourceSubmissionId === submission.id)
        ? reports
        : [...reports, approvedReport],
    });
  }
}

async function removeApprovedContributionAssets(storage: BinaryStorage, submission: RouteContributionSubmission) {
  await Promise.all([
    mutateJson({
      storage,
      blobName: approvedPhotosBlobName(submission.river.slug),
      initial: [] as ApprovedCommunityPhoto[],
      mutate: (photos) => photos.filter((item) => item.sourceSubmissionId !== submission.id),
    }),
    mutateJson({
      storage,
      blobName: approvedReportsBlobName(submission.river.slug),
      initial: [] as ApprovedTripReport[],
      mutate: (reports) => reports.filter((item) => item.sourceSubmissionId !== submission.id),
    }),
  ]);
}

export async function readApprovedCommunityPhoto(slug: string, submissionId: string, fileName: string) {
  return contributionsStorage().readBytes(approvedPhotoBlobName(slug, submissionId, fileName));
}

export async function readContributionSubmissionFile(submissionId: string, fileName: string) {
  return contributionsStorage().readBytes(submissionFileBlobName(submissionId, fileName));
}

export function getContributionFilePreviewUrl(submissionId: string, fileName: string) {
  return `/api/admin/route-contributions/files/${encodeURIComponent(submissionId)}/${encodeURIComponent(fileName)}`;
}

export function verifyAdminPassword(password: string) {
  const configured = (process.env.PADDLETODAY_ADMIN_PASSWORD || '').trim();
  if (!configured) {
    return false;
  }
  const left = Buffer.from(password || '', 'utf8');
  const right = Buffer.from(configured, 'utf8');
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

export function adminAuthConfigured() {
  return Boolean((process.env.PADDLETODAY_ADMIN_PASSWORD || '').trim());
}

export function createAdminSessionCookie() {
  const secret = (process.env.PADDLETODAY_ADMIN_SESSION_SECRET || process.env.PADDLETODAY_ADMIN_PASSWORD || '').trim();
  const exp = Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS;
  const payload = `admin.${exp}`;
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  const token = `${payload}.${signature}`;
  const secure = process.env.NODE_ENV === 'production' || process.env.PADDLETODAY_COOKIE_SECURE === 'true';
  return `${ADMIN_SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ADMIN_SESSION_TTL_SECONDS}${secure ? '; Secure' : ''}`;
}

export function clearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' || process.env.PADDLETODAY_COOKIE_SECURE === 'true';
  return `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? '; Secure' : ''}`;
}

export function isAdminRequestAuthorized(cookieHeader: string | undefined) {
  const token = parseCookie(cookieHeader, ADMIN_SESSION_COOKIE);
  if (!token) return false;

  const secret = (process.env.PADDLETODAY_ADMIN_SESSION_SECRET || process.env.PADDLETODAY_ADMIN_PASSWORD || '').trim();
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [kind, expRaw, signature] = parts;
  if (kind !== 'admin') return false;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const payload = `${kind}.${expRaw}`;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  const left = Buffer.from(signature, 'utf8');
  const right = Buffer.from(expected, 'utf8');
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function parseCookie(header: string | undefined, name: string) {
  if (!header) return '';
  const parts = header.split(/;\s*/);
  for (const part of parts) {
    const index = part.indexOf('=');
    if (index <= 0) continue;
    const key = part.slice(0, index).trim();
    if (key !== name) continue;
    return part.slice(index + 1).trim();
  }
  return '';
}

function submissionBlobName(id: string) {
  return `${ROUTE_CONTRIBUTIONS_PREFIX}/submissions/${id}/submission.json`;
}

function submissionFileBlobName(id: string, fileName: string) {
  return `${ROUTE_CONTRIBUTIONS_PREFIX}/submissions/${id}/files/${sanitizeFileSegment(fileName, 'photo')}`;
}

function approvedPhotosBlobName(slug: string) {
  return `${ROUTE_CONTRIBUTIONS_PREFIX}/approved/photos/${cleanPathSegment(slug)}.json`;
}

function approvedReportsBlobName(slug: string) {
  return `${ROUTE_CONTRIBUTIONS_PREFIX}/approved/reports/${cleanPathSegment(slug)}.json`;
}

function approvedPhotoBlobName(slug: string, submissionId: string, fileName: string) {
  return `${ROUTE_CONTRIBUTIONS_PREFIX}/approved/files/${cleanPathSegment(slug)}/${submissionId}-${sanitizeFileSegment(fileName, 'photo')}`;
}

function indexBlobName() {
  return `${ROUTE_CONTRIBUTIONS_PREFIX}/submissions/index.json`;
}

function communityPhotoUrl(slug: string, submissionId: string, fileName: string) {
  return `/api/community-photos/${encodeURIComponent(slug)}/${encodeURIComponent(submissionId)}/${encodeURIComponent(fileName)}`;
}

function contributionsStorage(): BinaryStorage {
  const containerSasUrl = process.env.ROUTE_CONTRIBUTIONS_CONTAINER_SAS_URL ?? '';
  const container = parseContainerSas(containerSasUrl);
  const jsonStorage = createJsonStorage({
    containerSasUrl,
    localDirectory: process.env.ROUTE_CONTRIBUTIONS_DIR || DEFAULT_CONTRIBUTIONS_DIR,
    validate: isContributionStorageValue,
    label: 'contribution',
  });
  if (container) {
    return {
      kind: 'blob',
      readJson: (blobName) => jsonStorage.readJson(blobName),
      readJsonWithEtag: (blobName) => jsonStorage.readJsonWithEtag(blobName),
      writeJson: jsonStorage.writeJson,
      async readBytes(blobName: string) {
        const response = await fetch(blobUrl(container, blobName), { method: 'GET' });
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`Failed to read contribution file ${blobName}: HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        return {
          buffer: Buffer.from(arrayBuffer),
          contentType: response.headers.get('content-type'),
        };
      },
      async writeBytes(blobName: string, value: Buffer, contentType: string) {
        const response = await fetch(blobUrl(container, blobName), {
          method: 'PUT',
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'content-type': contentType || 'application/octet-stream',
          },
          body: value,
        });
        if (!response.ok) throw new Error(`Failed to write contribution file ${blobName}: HTTP ${response.status}`);
      },
      async deleteBlob(blobName: string) {
        const response = await fetch(blobUrl(container, blobName), { method: 'DELETE' });
        if (response.status !== 404 && !response.ok) {
          throw new Error(`Failed to delete contribution blob ${blobName}: HTTP ${response.status}`);
        }
      },
    };
  }

  return {
    kind: 'local',
    readJson: (blobName) => jsonStorage.readJson(blobName),
    readJsonWithEtag: (blobName) => jsonStorage.readJsonWithEtag(blobName),
    writeJson: jsonStorage.writeJson,
    async readBytes(blobName: string) {
      const filePath = localPathFor(blobName);
      try {
        const payload = await readFile(filePath);
        return { buffer: payload, contentType: contentTypeFromName(filePath) };
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          return null;
        }
        throw error;
      }
    },
    async writeBytes(blobName: string, value: Buffer) {
      const filePath = localPathFor(blobName);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, value);
    },
    async deleteBlob(blobName: string) {
      await rm(localPathFor(blobName), { force: true });
    },
  };
}

function localPathFor(blobName: string) {
  return resolve(process.cwd(), process.env.ROUTE_CONTRIBUTIONS_DIR || DEFAULT_CONTRIBUTIONS_DIR, blobName);
}

function sanitizeFileSegment(value: string, fallback: string) {
  const cleaned = value.trim().replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^[-.]+|[-.]+$/g, '');
  return cleaned || fallback;
}

function isSafeSubmissionId(value: string) {
  return /^contribution_[a-zA-Z0-9-]+$/.test(value);
}

function contentTypeFromName(value: string) {
  const lowered = value.toLowerCase();
  if (lowered.endsWith('.jpg') || lowered.endsWith('.jpeg')) return 'image/jpeg';
  if (lowered.endsWith('.png')) return 'image/png';
  if (lowered.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}
