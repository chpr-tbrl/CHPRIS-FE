// utilities for transforming data
import { format, isValid } from "date-fns";
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

// function for capitalizing form inputs
// https://stackoverflow.com/questions/19023226/map-over-object-preserving-keys

export function normalizeData(inputs) {
  // parse the object
  return Object.fromEntries(
    Object.entries(inputs).map(([key, value]) => {
      // format all dates so they don't get coerced
      // also convert nullish values to null so they dont get stored as 0000-00-00
      if (key.includes("date")) {
        // check validity
        if (!value || !isValid(new Date(value))) {
          return [key, null];
        }
        return [key, format(new Date(value), "yyyy-MM-dd")];
      }
      // do not parse phone numbers or nullish values
      else if (!value || key.includes("telephone")) {
        return [key, value];
      }

      // do not parse booleans or numbers too
      // Booleans will be converted to YES/NO at export
      else if (typeof value === "number" || typeof value === "boolean") {
        return [key, value];
      }
      // capitalize everything else
      return [key, value.toUpperCase()];
    })
  );
}

// transform values to lower case for updates
export function deNormalizeData(inputs) {
  // parse the object
  return Object.fromEntries(
    Object.entries(inputs).map(([key, value]) => {
      // format all dates so they don't get coerced
      // also convert nullish values to null so they dont get stored as 0000-00-00
      if (key.includes("date")) {
        // check validity
        if (!value || !isValid(new Date(value))) {
          return [key, null];
        }
        return [key, format(new Date(value), "yyyy-MM-dd")];
      }

      // do not parse phone numbers or nullish values
      else if (!value || key.includes("telephone")) {
        return [key, value];
      }

      // do not parse booleans or numbers too
      // Booleans will be converted to YES/NO at export
      else if (typeof value === "number" || typeof value === "boolean") {
        return [key, value];
      }
      // set everything else to lowercase
      return [key, value.toLowerCase()];
    })
  );
}
