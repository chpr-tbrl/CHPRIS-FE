// utilities for transforming data

export function formatUTCDate(date) {
  return new Date(date).toLocaleString();
}

export function getRegions(data) {
  const regions = data.map((item) => item.region);
  return regions.length ? regions : [];
}

export function getSites(id, data) {
  if (!id) return [];
  const sites = data.filter((site) => site.region.id === id);
  return sites;
}
export function getRegionName(id, regions) {
  const region = regions.find((region) => region.id === id);
  return region ? region.name : "N/A";
}

export function getSiteName(id, sites) {
  const site = sites.find((site) => site.id === id);
  return site ? site.name : "N/A";
}
