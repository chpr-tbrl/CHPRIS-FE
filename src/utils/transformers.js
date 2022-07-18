// utilities for transforming data

export function formatUTCDate(date) {
  return new Date(date).toLocaleString();
}

export function getRegions(data) {
  if (!data) return [];
  const ids = data.map((item) => item.region.id);
  const filtered = data
    .filter(({ region }, index) => !ids.includes(region.id, index + 1))
    .map((item) => item.region);
  return filtered;
}

export function getSites(id, data) {
  if (!id) return [];
  return data.filter((site) => site.region.id === id);
}
export function getRegionName(id, regions) {
  const region = regions.find((region) => region.id === id);
  return region ? region.name : "N/A";
}

export function getSiteName(id, sites) {
  const site = sites.find((site) => site.id === id);
  return site ? site.name : "N/A";
}

export function getSelectedItem(data, id) {
  const index = data.findIndex((item) => item.id === id);
  return data[index];
}
