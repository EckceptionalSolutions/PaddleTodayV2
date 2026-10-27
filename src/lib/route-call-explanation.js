const sentences = value => String(value || '').split(/(?<=[.!?])\s+/).map(part => part.trim()).filter(Boolean);
const usefulReadinessReason = result => {
  const reason = result?.readiness?.reason?.trim();
  return reason && !/^Derived from a stored result/i.test(reason) ? reason : '';
};

/** The visible reason for the call: current evidence, with failed checks first. */
export function routeCallExplanation(result, { unavailable = false, fallback = '' } = {}) {
  if (unavailable) {
    return usefulReadinessReason(result) || result?.liveData?.summary || 'Current readings are unavailable. Check the linked sources before relying on this call.';
  }

  const explanation = sentences(result?.explanation);
  const evidence = explanation.length > 1 ? explanation.slice(1) : explanation;
  const failedCheck = result?.checklist?.find(check => check.status === 'skip')?.detail;
  const breakdown = result?.scoreBreakdown;
  const weatherPenalty = [
    [breakdown?.windAdjustment, breakdown?.windExplanation],
    [breakdown?.temperatureAdjustment, breakdown?.temperatureExplanation],
    [breakdown?.rainAdjustment, breakdown?.rainExplanation],
    [breakdown?.comfortAdjustment, breakdown?.comfortExplanation],
  ].filter(([adjustment, detail]) => typeof adjustment === 'number' && adjustment < 0 && detail)
    .sort(([left], [right]) => left - right)[0]?.[1];
  const readinessReason = ['verify', 'skip'].includes(result?.readiness?.status) ? usefulReadinessReason(result) : '';
  const candidates = [failedCheck, readinessReason, weatherPenalty, ...evidence];
  const visible = [];
  for (const candidate of candidates) {
    for (const sentence of sentences(candidate)) {
      if (!visible.includes(sentence)) visible.push(sentence);
      if (visible.length === 2) return visible.join(' ');
    }
  }
  return visible.join(' ') || fallback || 'Check the current gauge, weather and access sources before launching.';
}
