import PropTypes from "prop-types";
import { useGetProfileQuery } from "services";

export const useProfile = (id) => {
  const {
    data: account = {},
    isFetching: fetchingProfile,
    isError,
    refetch,
  } = useGetProfileQuery(id, {
    skip: !id ? true : false,
    refetchOnMountOrArgChange: true,
  });

  return {
    account,
    fetchingProfile,
    profileError: isError,
    reloadProfile: refetch,
  };
};

useProfile.propTypes = {
  id: PropTypes.number.isRequired,
};
