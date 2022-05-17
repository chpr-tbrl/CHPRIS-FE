import React from "react";
import { PageHeader, RecordCard } from "components";
import {
  Grid,
  Button,
  Column,
  Pagination,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from "@carbon/react";
import { Add, Renew } from "@carbon/icons-react";
import { Link } from "react-router-dom";

const Records = () => {
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
                  renderIcon={Renew}
                  kind="tertiary"
                  onClick={() => alert("Button click")}
                >
                  Refresh
                </Button>
                <Button renderIcon={Add} as={Link} to="new">
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
                  renderIcon={Renew}
                  hasIconOnly
                  kind="tertiary"
                  onClick={() => alert("Button click")}
                />
                <Button
                  renderIcon={Add}
                  hasIconOnly
                  onClick={() => alert("Button click")}
                />
              </TableToolbarContent>
            </TableToolbar>
          </div>
        </div>

        <Grid fullWidth narrow>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
          <Column sm={4} md={4} lg={4} className="record--card__container">
            <RecordCard name="Jane Doe" />
          </Column>
        </Grid>

        <br />

        <Pagination
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={8}
          className="card--grid__pagination"
        />
      </div>
    </div>
  );
};

export default Records;
