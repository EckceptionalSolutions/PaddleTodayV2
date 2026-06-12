const FONT_TIMEOUT_MESSAGE = '6000ms timeout exceeded';
const FONT_TIMEOUT_SOURCE = 'fontfaceobserver';

if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (event) => {
      if (isFontTimeoutError(event.error, event.message, event.filename)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      if (isFontTimeoutError(event.reason)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

function isFontTimeoutError(error: unknown, message = '', source = '') {
  const text = [
    message,
    source,
    error instanceof Error ? error.message : '',
    error instanceof Error ? error.stack : '',
    typeof error === 'string' ? error : '',
  ]
    .filter(Boolean)
    .join('\n')
    .toLowerCase();

  return text.includes(FONT_TIMEOUT_MESSAGE) && text.includes(FONT_TIMEOUT_SOURCE);
}
