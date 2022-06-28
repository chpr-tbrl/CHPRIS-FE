import PropTypes from "prop-types";
import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { accountSelector } from "features";
import { getRegions, getSites } from "utils";

// setValue is passed in from react-hook-form declaration
export const useFetchedRegionsAndSites = (setValue) => {
  const [regionId, setRegionId] = useState(null);
  const account = useSelector(accountSelector);

  const regions = getRegions(account.users_sites);

  const sites = useMemo(() => {
    return getSites(regionId, account.users_sites);
  }, [account, regionId]);

  const selectRegion = useCallback(
    (id) => {
      setRegionId(id);
      setValue("region_id", id, {
        shouldValidate: true,
      });
    },
    [setValue]
  );

  const selectSite = useCallback(
    (id) => {
      setValue("site_id", id, {
        shouldValidate: true,
      });
    },
    [setValue]
  );

  return {
    regionId,
    regions,
    sites,
    selectRegion,
    selectSite,
  };
};

useFetchedRegionsAndSites.propTypes = {
  setValue: PropTypes.func.isRequired,
};
