import PropTypes from "prop-types";
import { useGetProfileQuery } from "services";

export const useProfile = (id) => {
  const { data: account = {}, isFetching: fetchingProfile } =
    useGetProfileQuery(id, {
      skip: !id ? true : false,
      refetchOnMountOrArgChange: true,
    });

  return {
    account,
    fetchingProfile,
  };
};

useProfile.propTypes = {
  id: PropTypes.number.isRequired,
};
