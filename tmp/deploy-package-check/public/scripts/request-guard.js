export function createRequestGuard() {
  let requestId = 0;
  let controller = null;

  return {
    begin() {
      requestId += 1;
      controller?.abort();
      controller = new AbortController();
      return {
        requestId,
        controller,
      };
    },
    isCurrent(id) {
      return id === requestId;
    },
    finish(activeController) {
      if (controller === activeController) {
        controller = null;
      }
    },
  };
}

export function isAbortError(error) {
  return error instanceof DOMException && error.name === 'AbortError';
}
