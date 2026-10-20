interface AccessPlan {
  logistics?: {
    accessCaveats?: readonly string[];
    watchFor?: readonly string[];
    permits?: string;
    camping?: string;
  };
  safetyProfile?: { safetyNotes?: readonly string[] };
}

/** Present exact repeated notes once; retain every distinct note with its plan. */
export function sharedAccessPlanNotes(plans: readonly AccessPlan[]) {
  const common = (read: (plan: AccessPlan) => readonly string[] | undefined) =>
    [...new Set(plans.flatMap(plan => read(plan) ?? []))].filter(note => plans.filter(plan => read(plan)?.includes(note)).length > 1);
  const commonText = (read: (plan: AccessPlan) => string | undefined) => {
    const value = plans.map(read).find(note => note && plans.filter(plan => read(plan) === note).length > 1);
    return value ?? '';
  };
  return {
    access: common(plan => plan.logistics?.accessCaveats),
    hazards: common(plan => plan.logistics?.watchFor),
    safety: common(plan => plan.safetyProfile?.safetyNotes),
    permits: commonText(plan => plan.logistics?.permits),
    camping: commonText(plan => plan.logistics?.camping),
  };
}

export function specificAccessPlanNotes(plan: AccessPlan, shared: ReturnType<typeof sharedAccessPlanNotes>) {
  return {
    access: (plan.logistics?.accessCaveats ?? []).filter(note => !shared.access.includes(note)),
    hazards: (plan.logistics?.watchFor ?? []).filter(note => !shared.hazards.includes(note)),
    safety: (plan.safetyProfile?.safetyNotes ?? []).filter(note => !shared.safety.includes(note)),
    permits: plan.logistics?.permits === shared.permits ? '' : plan.logistics?.permits,
    camping: plan.logistics?.camping === shared.camping ? '' : plan.logistics?.camping,
  };
}
