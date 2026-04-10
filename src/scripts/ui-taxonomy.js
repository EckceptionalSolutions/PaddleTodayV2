export function confidenceDisplayLabel(label) {
  if (label === 'High') return 'Well-supported';
  if (label === 'Medium') return 'Some uncertainty';
  if (label === 'Low') return 'Cautious call';
  return 'Support unclear';
}

export function liveDataWarning(liveData, options = {}) {
  if (!liveData || liveData.overall === 'live') {
    return null;
  }

  const {
    offlineShort = 'Feed issue',
    degradedShort = 'Limited reads',
    offlineDetail = 'Direct live reads are unavailable for this route right now.',
    degradedDetail = 'Some live inputs are stale or partial for this route right now.',
  } = options;

  if (liveData.overall === 'offline') {
    return {
      short: offlineShort,
      detail: liveData.summary || offlineDetail,
    };
  }

  return {
    short: degradedShort,
    detail: liveData.summary || degradedDetail,
  };
}
