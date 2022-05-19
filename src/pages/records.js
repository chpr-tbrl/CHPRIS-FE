import React, { useState } from "react";
import { PageHeader, RecordCard, ActionCard } from "components";
import {
  Grid,
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
  Renew,
  Person,
  Archive,
  PillsAdd,
  Hospital,
  DocumentAdd,
  ReminderMedical,
} from "@carbon/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { saveRecord, recordSelector } from "features";
import { Link } from "react-router-dom";

const Records = () => {
  const [open, setOpen] = useState(false);
  const record = useSelector(recordSelector);
  const dispatch = useDispatch();

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
    <div className="page">
      <PageHeader
        title="Records"
        description="Manage and update all available client  records"
      />

      <div className="card--grid">
        <div className="card--grid__header">
          <div className="search--desktop">
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
          </div>
          <div className="search--mobile">
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
                  as={Link}
                  to="new"
                  renderIcon={Add}
                  iconDescription="new record"
                />
              </TableToolbarContent>
            </TableToolbar>
          </div>
        </div>

        <Grid fullWidth narrow>
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
        </Grid>

        <br />

        <Pagination
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={8}
          className="card--grid__pagination"
        />
      </div>

      <Modal
        open={open}
        passiveModal
        modalHeading="Available actions"
        modalLabel="Record details"
        aria-label="Available actions"
        onRequestClose={() => setOpen(false)}
      >
        <Grid fullWidth>
          <Column sm={4} md={8} lg={16}>
            <PageHeader
              title={record?.name}
              description={`Manage and update records for ${record?.name}`}
            />
          </Column>
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
        </Grid>
      </Modal>
    </div>
  );
};

export default Records;
