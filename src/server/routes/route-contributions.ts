import type { ServerResponse } from 'node:http';
import type { ApiRequest } from '../http';
import { clean, readJsonBody, sendBinary, sendBodyLimitResponse, sendJson } from '../http';
import { contentTypeFor } from '../static-route';
import { getIp, isRateLimited } from '../rate-limit';
import { getRiverBySlug } from '../../lib/rivers';
import {
  createRouteContributionSubmission,
  getApprovedCommunityForRoute,
  readApprovedCommunityPhoto,
} from '../../lib/route-contributions';

const ROUTE_CONTRIBUTION_MAX_FILES = 4;
const ROUTE_CONTRIBUTION_MAX_FILE_BYTES = 4 * 1024 * 1024;
const ROUTE_CONTRIBUTION_JSON_BODY_LIMIT_BYTES = 24 * 1024 * 1024;

export async function handleRoutePhotoSubmission(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return sendJson(
      response,
      429,
      {
        requestId,
        error: 'too_many_requests',
        message: 'Too many requests. Please try again later.',
      },
      includeBody,
      'no-store'
    );
  }

  try {
    const body = await readJsonBody(request, ROUTE_CONTRIBUTION_JSON_BODY_LIMIT_BYTES);
    const riverSlug = clean(body?.riverSlug, 160);
    const contributorName = clean(body?.contributorName, 120);
    const contributorEmail = clean(body?.contributorEmail, 160).toLowerCase();
    const tripDate = clean(body?.tripDate, 40);
    const tripSentiment = clean(body?.tripSentiment, 40);
    const tripReport = clean(body?.tripReport, 1800);
    const notes = clean(body?.notes, 1200);
    const rightsConfirmed = body?.rightsConfirmed === true;
    const reviewConsent = body?.reviewConsent === true;
    const honeypot = clean(body?.company, 240);
    const files = Array.isArray(body?.files) ? body.files : [];

    if (honeypot) {
      return sendJson(response, 202, { requestId, ok: true, stored: false }, includeBody, 'no-store');
    }

    if (!riverSlug || !contributorName || !contributorEmail || !reviewConsent) {
      return sendJson(
        response,
        400,
        { requestId, error: 'missing_required_fields', message: 'Missing required contribution fields.' },
        includeBody,
        'no-store'
      );
    }

    if (!isValidEmail(contributorEmail)) {
      return sendJson(
        response,
        400,
        { requestId, error: 'invalid_email', message: 'Enter a valid email address.' },
        includeBody,
        'no-store'
      );
    }

    if (files.length > ROUTE_CONTRIBUTION_MAX_FILES) {
      return sendJson(
        response,
        400,
        { requestId, error: 'too_many_files', message: `Upload up to ${ROUTE_CONTRIBUTION_MAX_FILES} photos at a time.` },
        includeBody,
        'no-store'
      );
    }

    const hasPhotos = files.length > 0;
    if (!hasPhotos && tripReport.length < 12) {
      return sendJson(
        response,
        400,
        { requestId, error: 'not_enough_detail', message: 'Add a trip review or upload at least one photo.' },
        includeBody,
        'no-store'
      );
    }

    if (hasPhotos && !rightsConfirmed) {
      return sendJson(
        response,
        400,
        { requestId, error: 'rights_required', message: 'Confirm that the uploaded photos are yours or shared with permission.' },
        includeBody,
        'no-store'
      );
    }

    const river = getRiverBySlug(riverSlug);
    if (!river) {
      return sendJson(
        response,
        404,
        { requestId, error: 'not_found', message: 'That river route could not be found.' },
        includeBody,
        'no-store'
      );
    }

    const decodedFiles = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const originalName = clean(file?.name, 240) || `photo-${index + 1}`;
      const decoded = decodeImageDataUrl(clean(file?.dataUrl, 8_000_000));
      const byteSize = Number(file?.size);

      if (!decoded || !isSupportedPhotoMime(decoded.mimeType)) {
        return sendJson(
          response,
          400,
          { requestId, error: 'invalid_photo_type', message: 'Photos must be JPG, PNG, or WebP.' },
          includeBody,
          'no-store'
        );
      }

      if (
        !Number.isFinite(byteSize) ||
        byteSize <= 0 ||
        byteSize > ROUTE_CONTRIBUTION_MAX_FILE_BYTES ||
        decoded.buffer.length > ROUTE_CONTRIBUTION_MAX_FILE_BYTES
      ) {
        return sendJson(
          response,
          400,
          { requestId, error: 'file_too_large', message: 'Each photo must be 4 MB or smaller.' },
          includeBody,
          'no-store'
        );
      }

      const extension = extensionForPhotoMime(decoded.mimeType);
      const fileName = `${String(index + 1).padStart(2, '0')}-${sanitizeFileSegment(originalName, 'photo')}${extension}`;
      decodedFiles.push({
        fileName,
        originalName,
        mimeType: decoded.mimeType,
        size: byteSize,
        buffer: decoded.buffer,
        caption: clean(file?.caption, 240),
      });
    }

    const result = await createRouteContributionSubmission({
      river: {
        slug: river.slug,
        name: river.name,
        reach: river.reach,
        state: river.state,
        region: river.region,
      },
      contributor: {
        name: contributorName,
        email: contributorEmail,
      },
      trip: {
        date: tripDate,
        sentiment: tripSentiment,
        report: tripReport,
      },
      notes,
      rightsConfirmed,
      reviewConsent,
      files: decodedFiles,
      meta: {
        ip,
        ua: clean(request.headers['user-agent'], 240),
        referer: clean(request.headers.referer, 500),
      },
    });

    return sendJson(
      response,
      202,
      { requestId, ok: true, stored: true, storage: result.storage, submissionId: result.submission.id },
      includeBody,
      'no-store'
    );
  } catch (error) {
    const bodyLimitResponse = sendBodyLimitResponse(error, response, requestId, includeBody);
    if (bodyLimitResponse) return bodyLimitResponse;

    console.error('[route-photo-submission] request failed', { requestId, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Failed to store photo submission.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleRouteCommunity(
  _request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  slug: string
) {
  try {
    const community = await getApprovedCommunityForRoute(slug);
    return sendJson(response, 200, { requestId, riverSlug: slug, ...community }, includeBody, 'no-store');
  } catch (error) {
    console.error('[route-community] request failed', { requestId, slug, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Failed to load route community content.' },
      includeBody,
      'no-store'
    );
  }
}

export async function handleCommunityPhoto(
  _request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  slug: string,
  submissionId: string,
  fileName: string
) {
  try {
    const asset = await readApprovedCommunityPhoto(slug, submissionId, fileName);
    if (!asset) {
      return sendJson(response, 404, { requestId, error: 'not_found', message: 'Photo not found.' }, true, 'no-store');
    }

    return sendBinary(response, 200, asset.buffer, asset.contentType || contentTypeFor(fileName), 'public, max-age=3600');
  } catch (error) {
    console.error('[route-community] photo request failed', { requestId, slug, submissionId, fileName, error });
    return sendJson(
      response,
      502,
      { requestId, error: 'request_failed', message: 'Failed to load photo.' },
      true,
      'no-store'
    );
  }
}


function sanitizeFileSegment(value: string, fallback = 'file') {
  const normalized = clean(value, 120)
    .toLowerCase()
    .replace(/\.[a-z0-9]{2,5}$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || fallback;
}

function isSupportedPhotoMime(value: string) {
  return value === 'image/jpeg' || value === 'image/png' || value === 'image/webp';
}

function extensionForPhotoMime(value: string) {
  switch (value) {
    case 'image/png':
      return '.png';
    case 'image/webp':
      return '.webp';
    case 'image/jpeg':
    default:
      return '.jpg';
  }
}

function decodeImageDataUrl(value: string) {
  const match = value.match(/^data:(image\/(?:jpeg|png|webp));base64,([a-z0-9+/=]+)$/i);
  if (!match) {
    return null;
  }

  try {
    return {
      mimeType: match[1].toLowerCase(),
      buffer: Buffer.from(match[2], 'base64'),
    };
  } catch {
    return null;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
