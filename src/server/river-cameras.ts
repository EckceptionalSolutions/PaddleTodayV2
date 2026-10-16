const API = 'https://api.waterdata.usgs.gov/nims/v0';
const TTL = 15 * 60_000;

export interface RiverCamera {
  id: string;
  name: string;
  siteId: string;
  imageUrl: string;
  capturedAt: string;
  sourceUrl: string;
}

// One shared catalog request per refresh, including concurrent page visits.
export function createCameraService(fetcher: typeof fetch = fetch, now = Date.now) {
  let cached: RiverCamera[] = [];
  let expires = 0;
  let pending: Promise<RiverCamera[]> | undefined;
  let available = false;
  return async (siteId: string): Promise<RiverCamera[]> => {
    if (now() >= expires) {
      pending ??= (async () => {
        try {
          const response = await fetcher(`${API}/cameras`, {
            signal: AbortSignal.timeout(8000),
            headers: process.env.USGS_API_KEY ? { 'X-Api-Key': process.env.USGS_API_KEY } : {},
          });
          if (!response.ok) throw new Error(`NIMS ${response.status}`);
          const data: unknown = await response.json();
          if (!Array.isArray(data)) throw new Error('Invalid NIMS catalog');
          cached = data.flatMap((camera): RiverCamera[] => {
            if (!camera || camera.hideCam || typeof camera.camId !== 'string' ||
                !/^[\w-]+$/.test(camera.camId) || typeof camera.nwisId !== 'string' ||
                typeof camera.camName !== 'string' || typeof camera.newestImageDT !== 'string' ||
                !Number.isFinite(Date.parse(camera.newestImageDT)) ||
                typeof camera.smallDir !== 'string' ||
                !camera.smallDir.startsWith('https://usgs-nims-images.s3.amazonaws.com/720/')) return [];
            // Keep a timestamp-specific image so its caption cannot describe a newer frame.
            const timestamp = new Date(camera.newestImageDT).toISOString().replace(/\.\d{3}Z$/, 'Z').replace(/:/g, '-');
            const base = camera.smallDir.endsWith('/') ? camera.smallDir : `${camera.smallDir}/`;
            return [{ id: camera.camId, name: camera.camName, siteId: camera.nwisId,
              capturedAt: camera.newestImageDT,
              imageUrl: `${base}${camera.camId}___${timestamp}.jpg`,
              sourceUrl: `https://apps.usgs.gov/hivis/camera/${camera.camId}` }];
          });
          expires = now() + TTL;
          available = true;
          return cached;
        } catch (error) {
          // Retain last-known frames and their real capture dates on upstream failures.
          expires = now() + 60_000;
          throw error;
        } finally { pending = undefined; }
      })();
      try { await pending; } catch { if (!cached.length) throw new Error('Camera service unavailable'); }
    }
    if (!available) throw new Error('Camera service unavailable');
    return cached.filter(camera => camera.siteId === siteId);
  };
}

export const getRiverCameras = createCameraService();
