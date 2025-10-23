export const ns = {
  team: (id: string) => `team:${id}`,
  match: (id: string) => `match:${id}`,
  season: (year: number | string) => `season:${year}`,
  comp: (league: string) => `comp:${league}`,
};