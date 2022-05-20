import React, { useState } from "react";
import { PageHeader, RecordCard, ActionCard, Spacer } from "components";
import {
  Row,
  FlexGrid,
  Button,
  Modal,
  Column,
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

import { useDispatch, useSelector } from "react-redux";
import { saveRecord, recordSelector } from "features";
import { Link, useNavigate } from "react-router-dom";

const Records = () => {
  const [open, setOpen] = useState(false);
  const record = useSelector(recordSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function showActions() {
    let record = {
      id: "1024",
      name: "Jane Doe",
      sex: "F",
      created: new Date().toLocaleString(),
      updated: new Date().toLocaleString(),
    };
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
                kind="tertiary"
                renderIcon={Renew}
                iconDescription="refresh"
                onClick={() => alert("refresh clicked")}
              >
                Refresh
              </Button>
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
                onClick={() => alert("refresh clicked")}
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
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
        <Column sm={4} md={4} lg={4} className="record--card__container">
          <RecordCard name="Jane Doe" onClick={() => showActions()} />
        </Column>
      </Row>

      <Spacer h={7} />
      <Pagination pageSizes={[10, 20, 30, 40, 50]} totalItems={8} />

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
            title={record?.name}
            description={`Manage and update records for ${record?.name}`}
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
