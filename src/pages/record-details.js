import React from "react";
import { PageHeader, TabBar } from "components";
import { Button, FormLabel, FlexGrid, Row, Column } from "@carbon/react";
import { useSelector } from "react-redux";
import { recordSelector } from "features";

const RecordDetails = () => {
  const record = useSelector(recordSelector);

  return (
    <div className="page">
      <TabBar />
      <PageHeader
        title="Information"
        description="Manage and update record information"
      />

      <FlexGrid fullWidth condensed>
        <Row>
          <Column>
            <FormLabel>ID</FormLabel>
            <p>{record?.id}</p>
            <br />
          </Column>
          <Column>
            <FormLabel>Patient's name</FormLabel>
            <p>{record?.name}</p>
            <br />
          </Column>
        </Row>
        <Row>
          <Column>
            <FormLabel>Telephone</FormLabel>
            <p>658794635</p>
            <br />
          </Column>
          <Column>
            <FormLabel>Alternative Telephone</FormLabel>
            <p>658794635</p>
            <br />
          </Column>
        </Row>
        <Row>
          <Column>
            <FormLabel>Sex</FormLabel>
            <p>Female</p>
            <br />
            <FormLabel>Date of test request</FormLabel>
            <p>{record?.created}</p>
            <br />
            <FormLabel>Address</FormLabel>
            <p>Here</p>
            <br />
          </Column>
          <Column>
            <FormLabel>ART</FormLabel>
            <p>lorem ipsum</p>
            <br />
            <FormLabel>Status</FormLabel>
            <p>Out patient</p>
            <br />
          </Column>
        </Row>
        <Row>
          <br />
          <Button>Edit</Button>
        </Row>
      </FlexGrid>
    </div>
  );
};

export default RecordDetails;
