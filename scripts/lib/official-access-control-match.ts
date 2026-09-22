export function officialAccessControlMatchesRoute(
  control: { state: string; routeIds?: string[] },
  route: { id: string; state: string },
) {
  return control.routeIds?.length
    ? control.routeIds.includes(route.id)
    : control.state === route.state;
}
