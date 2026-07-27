const difficultyOrder = ['easy', 'moderate', 'hard'];

export function defaultRiverHubFilters() {
  return {
    distance: 'all',
    difficulty: 'all',
    camping: 'all',
    routeType: 'all',
    region: 'all',
  };
}

export function riverHubFilterOptions(routes) {
  const difficulties = [...new Set(routes.map((route) => String(route?.difficulty || '').trim().toLowerCase()).filter(Boolean))]
    .sort((left, right) => {
      const leftIndex = difficultyOrder.indexOf(left);
      const rightIndex = difficultyOrder.indexOf(right);
      return (leftIndex < 0 ? difficultyOrder.length : leftIndex)
        - (rightIndex < 0 ? difficultyOrder.length : rightIndex);
    });
  const regions = [...new Set(routes.map((route) => route?.region).filter(Boolean))].sort();
  const camping = [...new Set(routes.map((route) => (
    route?.campingClassification && route.campingClassification !== 'none' ? 'available' : 'none'
  )))];
  const taggedRouteTypes = routes.map((route) => route?.routeType).filter(Boolean);
  const routeTypes = [...new Set(taggedRouteTypes)].sort();

  return {
    difficulties,
    regions,
    camping,
    routeTypes,
    availability: {
      difficulty: difficulties.length > 1,
      region: regions.length > 1,
      camping: camping.length > 1,
      routeType: taggedRouteTypes.length === routes.length && routeTypes.length > 1,
    },
  };
}

export function activeRiverHubFilterCount(filters) {
  return Object.entries(defaultRiverHubFilters())
    .reduce((count, [key, defaultValue]) => count + Number(filters?.[key] !== defaultValue), 0);
}
