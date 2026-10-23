/* Optional height adapter for Paddle Today route cards. No cookies or analytics. */
(() => {
  if (window.__paddleTodayEmbeds) return;
  window.__paddleTodayEmbeds = true;
  const frames = () => document.querySelectorAll('iframe[data-paddletoday-route]');
  window.addEventListener('message', event => {
    if (event.data?.type !== 'paddletoday:embed:resize' || !Number.isFinite(event.data.height)) return;
    for (const frame of frames()) {
      let origin;
      try { origin = new URL(frame.src, location.href).origin; } catch { continue; }
      if (event.source !== frame.contentWindow || event.origin !== origin) continue;
      frame.style.height = `${Math.min(1600, Math.max(200, Math.ceil(event.data.height)))}px`;
    }
  });
  const measure = frame => {
    try { frame.contentWindow?.postMessage({ type: 'paddletoday:embed:measure' }, new URL(frame.src, location.href).origin); } catch { /* Invalid or removed iframe. */ }
  };
  for (const frame of frames()) { frame.addEventListener('load', () => measure(frame)); measure(frame); }
})();
