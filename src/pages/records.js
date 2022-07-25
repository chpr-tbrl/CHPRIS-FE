import React, { useState, useRef } from "react";
import { useProfile } from "hooks";
import { SEARCH_OPTIONS } from "schemas";
import { useDispatch, useSelector } from "react-redux";
import { saveRecord, recordSelector, authSelector } from "features";
import { Link } from "react-router-dom";
import { useGetRecordsQuery } from "services";
import { Spacer, PageHeader, RecordCard, ActionCard } from "components";
import {
  Row,
  Button,
  Search,
  Modal,
  Column,
  Dropdown,
  Loading,
  FlexGrid,
  Pagination,
} from "@carbon/react";
import {
  Add,
  User,
  Renew,
  Person,
  Archive,
  Account,
  PillsAdd,
  Hospital,
  DocumentAdd,
  ReminderMedical,
  Search as SearchIcon,
} from "@carbon/icons-react";

const Records = () => {
  const [open, setOpen] = useState(false);
  const record = useSelector(recordSelector);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const mobileinputRef = useRef(null);
  const auth = useSelector(authSelector);
  const { account, fetchingProfile } = useProfile(auth.uid);
  const sites = account?.users_sites || [];
  const [params, setParams] = useState({});
  const [option, setOption] = useState("");

  const [site, setSite] = useState({});
  const [title, showTitle] = useState(false);

  const {
    data: records = [],
    isFetching,
    refetch,
  } = useGetRecordsQuery(params, {
    refetchOnMountOrArgChange: true,
  });

  function reset() {
    setOption("");
    setParams({});
    setSite({});
    refetch();
    showTitle(false);
  }

  function handleSearch(query) {
    reset();
    if (!query) return;
    if (!option) {
      alert("please select a search option");
      return;
    } else if (option === "id" && !site.id) {
      alert("Please select a site when searching by id");
      return;
    } else if (site.id) {
      setParams({
        id: query,
        site_id: site.id,
        region_id: site.region.id,
      });
      showTitle(true);
      return;
    }
    setParams({
      [option]: query,
    });
  }

  function showActions(record) {
    dispatch(saveRecord(record));
    setOpen(true);
  }

  if (fetchingProfile || isFetching) return <Loading />;
  return (
    <FlexGrid fullWidth className="page">
      <PageHeader
        title="Records"
        description="Manage and update all available records"
        renderIcon={<Account size={42} />}
      />
      <Spacer h={5} />

      <Row>
        {/* Desktop search bar */}
        <Column sm={0} md={8}>
          <div className="search--container">
            <Search
              size="lg"
              placeholder="search"
              labelText="search"
              className="search--bar"
              onKeyDown={(evt) =>
                evt.keyCode === 13 && handleSearch(evt.target.value)
              }
              onClear={() => reset()}
              ref={inputRef}
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
            <Button
              kind="ghost"
              hasIconOnly
              onClick={() => handleSearch(inputRef.current.value)}
              renderIcon={SearchIcon}
              iconDescription="search"
            />
            <Button
              kind="ghost"
              hasIconOnly
              onClick={() => reset()}
              renderIcon={Renew}
              iconDescription="refresh"
            />
            {!option && (
              <Button
                as={Link}
                to="new"
                renderIcon={Add}
                iconDescription="new record"
              >
                New record
              </Button>
            )}
          </div>
        </Column>

        {/* Mobile search bar */}
        <Column sm={4} md={0}>
          <Search
            size="lg"
            placeholder="search"
            labelText="search"
            className="search--bar"
            onKeyDown={(evt) =>
              evt.keyCode === 13 && handleSearch(evt.target.value)
            }
            onClear={() => reset()}
            ref={mobileinputRef}
          />
          <div className="search--container">
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
          <div className="search--container">
            <Button
              kind="ghost"
              onClick={() => reset()}
              renderIcon={Renew}
              iconDescription="refresh"
              className="search--option"
            >
              Refresh
            </Button>

            {!option ? (
              <Button
                as={Link}
                to="new"
                renderIcon={Add}
                iconDescription="new record"
                className="search--option"
              >
                New record
              </Button>
            ) : (
              <Button
                kind="secondary"
                onClick={() => handleSearch(mobileinputRef.current.value)}
                renderIcon={SearchIcon}
                iconDescription="search"
                className="search--option"
              >
                Search
              </Button>
            )}
          </div>
        </Column>
      </Row>
      <Spacer h={7} />

      <Column>
        <Spacer h={5} />
        <h5
          style={{
            textAlign: "start",
          }}
        >
          {title ? "Search results available for" : null}
        </h5>
        <Spacer h={5} />
      </Column>

      <Row>
        {records.length ? (
          records.map((record) => (
            <Column
              sm={4}
              md={4}
              lg={4}
              key={record.record_id}
              className="record--card__container"
            >
              <RecordCard
                id={record.record_id}
                name={record.records_name}
                sex={record.records_sex}
                date={record.records_date}
                updated={record.records_date_of_test_request}
                onClick={() => showActions(record)}
              />
            </Column>
          ))
        ) : (
          <Column>
            <Spacer h={5} />
            <h4
              style={{
                textAlign: "center",
              }}
            >
              No available records
            </h4>
            <Spacer h={5} />
          </Column>
        )}
      </Row>

      <Spacer h={7} />
      {records.length > 0 && (
        <Pagination
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={records?.length}
        />
      )}

      <Modal
        open={open}
        size="lg"
        passiveModal
        modalHeading="Available actions"
        modalLabel="Record details"
        aria-label="Available actions"
        onRequestClose={() => setOpen(false)}
        preventCloseOnClickOutside
      >
        <FlexGrid>
          <Row>
            <PageHeader
              title={record?.records_name}
              description="Manage and update records"
              renderIcon={<User size={42} />}
            />
          </Row>
          <Row narrow>
            <Column sm={4} md={4} lg={8} className="record--card__container">
              <ActionCard
                renderIcon={<Person size={32} />}
                label="Information"
                path="details"
              />
            </Column>
            <Column sm={4} md={4} lg={8} className="record--card__container">
              <ActionCard
                renderIcon={<PillsAdd size={32} />}
                label="Collect specimens"
                path="specimen-collection"
              />
            </Column>
            <Column sm={4} md={4} lg={8} className="record--card__container">
              <ActionCard
                renderIcon={<Hospital size={32} />}
                label="Lab results"
                path="lab-results"
              />
            </Column>
            <Column sm={4} md={4} lg={8} className="record--card__container">
              <ActionCard
                renderIcon={<ReminderMedical size={32} />}
                label="Follow up"
                path="follow-up"
              />
            </Column>
            <Column sm={4} md={4} lg={8} className="record--card__container">
              <ActionCard
                renderIcon={<DocumentAdd size={32} />}
                label="Outcome recorded"
                path="outcome-recorded"
              />
            </Column>
            <Column sm={4} md={4} lg={8} className="record--card__container">
              <ActionCard
                renderIcon={<Archive size={32} />}
                label="TB treatment outcome"
                path="tb-treatment-outcome"
              />
            </Column>
          </Row>
        </FlexGrid>
      </Modal>
    </FlexGrid>
  );
};

export default Records;
