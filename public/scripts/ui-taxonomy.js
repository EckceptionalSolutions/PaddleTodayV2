export function callStateForRating(rating) {
  if (rating === 'Fair') return 'watch';
  if (rating === 'No-go') return 'skip';
  return 'paddle';
}

export function callLabelForRating(rating, context = 'today', compact = false) {
  const state = callStateForRating(rating);
  if (compact) {
    if (state === 'paddle') return 'Paddle';
    if (state === 'watch') return 'Watch';
    return 'Skip';
  }
  if (state === 'paddle') return context === 'weekend' ? 'Paddle this weekend' : 'Paddle today';
  if (state === 'watch') return 'Watch closely';
  return context === 'weekend' ? 'Skip this weekend' : 'Skip today';
}

export function qualityTierLabel(rating) {
  if (rating === 'Strong') return 'Strong conditions';
  if (rating === 'Good') return 'Good conditions';
  if (rating === 'Fair') return 'Watch conditions';
  return 'Skip conditions';
}

export function confidenceDisplayLabel(label) {
  if (label === 'High') return 'High data confidence';
  if (label === 'Medium') return 'Some uncertainty';
  if (label === 'Low') return 'Low confidence';
  return 'Data confidence unclear';
}

export function ratingDisplayLabel(rating, options = {}) {
  const { liveData = null, compact = false } = options;

  if (rating === 'Fair') {
    return compact ? 'Watch' : 'Watch closely';
  }

  if (rating === 'No-go' && liveData?.overall === 'offline') {
    return compact ? 'Manual check' : 'Manual check needed';
  }

  return rating || 'Checking';
}

export function callDisplayLabel(rating, options = {}) {
  const { context = 'today', compact = false, liveData = null } = options;
  if (rating === 'No-go' && liveData?.overall === 'offline' && !compact) {
    return 'Manual check needed';
  }
  return callLabelForRating(rating, context, compact);
}

export function conditionTierDisplayLabel(rating) {
  return qualityTierLabel(rating);
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
