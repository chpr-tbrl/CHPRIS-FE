import React, { useState } from "react";
import { Search, Dropdown, Loading } from "@carbon/react";
import { useProfile } from "hooks";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { SEARCH_OPTIONS } from "schemas";
import { useGetRecordsQuery } from "services";

export const SearchBar = () => {
  const auth = useSelector(authSelector);
  const { account, fetchingProfile } = useProfile(auth.uid);
  const sites = account?.users_sites || [];
  const [params, setParams] = useState({});
  const [option, setOption] = useState("");
  const [site, setSite] = useState({});

  const { isFetching } = useGetRecordsQuery(params, {
    skip: !params[option],
    refetchOnMountOrArgChange: true,
  });

  function handleSearch(query) {
    console.log(
      "🚀 ~ file: SearchBar.js ~ line 15 ~ SearchBar ~ option",
      option
    );
    if (!option) {
      alert("please select a search option");
      return;
    } else if (option === "id" && !site.id) {
      alert("Please select a site when searching by id");
      return;
    } else if (site.id) {
      setParams({
        id: option,
        site_id: site.id,
        region_id: site.region.id,
      });
      return;
    }

    setParams({
      [option]: query,
    });
  }

  function clearSearch() {
    setOption("");
    setSite({});
  }

  if (fetchingProfile || isFetching) return <Loading />;
  return (
    <div className="search--container">
      <Search
        size="lg"
        placeholder="search"
        labelText="search"
        className="search--bar"
        onKeyDown={(evt) =>
          evt.keyCode === 13 && handleSearch(evt.target.value)
        }
        onClear={() => clearSearch()}
      />

      <Dropdown
        id="search-options"
        size="lg"
        titleText=""
        label="Search by"
        className="search--option"
        items={SEARCH_OPTIONS}
        itemToString={(item) => item.name}
        onChange={(evt) => setOption(evt.selectedItem.id)}
      />

      {option === "id" && (
        <Dropdown
          id="site-options"
          size="lg"
          titleText=""
          label="site"
          className="search--option"
          items={sites}
          itemToString={(item) => item.name}
          onChange={(evt) => setSite(evt.selectedItem)}
        />
      )}
    </div>
  );
};
