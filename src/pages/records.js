import React, { useState } from "react";
import { PageHeader, RecordCard, ActionCard, Spacer } from "components";
import { useDispatch, useSelector } from "react-redux";
import { saveRecord, recordSelector } from "features";
import { Link, useNavigate } from "react-router-dom";
import { useGetRecordsQuery } from "services";
import {
  Row,
  FlexGrid,
  Button,
  Modal,
  Column,
  Loading,
  Pagination,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
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
} from "@carbon/icons-react";

const Records = () => {
  const [open, setOpen] = useState(false);
  const record = useSelector(recordSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: records = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetRecordsQuery();

  function showActions(record) {
    dispatch(saveRecord(record));
    setOpen(true);
  }

  return (
    <FlexGrid fullWidth className="page">
      <PageHeader
        title="Records"
        description="Manage and update all available records"
        renderIcon={<Account size={42} />}
      />
      <Row>
        <Column sm={0} md={8}>
          <Spacer h={5} />
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch expanded />
              <Button
                kind="ghost"
                hasIconOnly
                onClick={() => refetch()}
                renderIcon={Renew}
                iconDescription="refresh"
              />
              <Button
                as={Link}
                to="new"
                renderIcon={Add}
                iconDescription="new record"
              >
                New record
              </Button>
            </TableToolbarContent>
          </TableToolbar>
        </Column>
        <Column sm={4} md={0}>
          <Spacer h={5} />
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch expanded />
              <Button
                hasIconOnly
                kind="tertiary"
                renderIcon={Renew}
                iconDescription="refresh"
                onClick={() => refetch()}
              />
              <Button
                hasIconOnly
                renderIcon={Add}
                iconDescription="new record"
                onClick={() => navigate("new")}
              />
            </TableToolbarContent>
          </TableToolbar>
        </Column>
      </Row>
      <Spacer h={7} />
      <Row>
        {isLoading || isFetching ? (
          <Loading />
        ) : records.length ? (
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
        passiveModal
        modalHeading="Available actions"
        modalLabel="Record details"
        aria-label="Available actions"
        onRequestClose={() => setOpen(false)}
      >
        <FlexGrid fullWidth>
          <PageHeader
            title={record?.records_name}
            description={`Manage and update records for ${record?.records_name}`}
            renderIcon={<User size={42} />}
          />
          <Row>
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
