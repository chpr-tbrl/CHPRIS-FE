import React from "react";
import { PageHeader, Spacer } from "components";
import {
  Button,
  FormLabel,
  FlexGrid,
  Row,
  Column,
  Stack,
  Loading,
} from "@carbon/react";
import { User } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";



const Account = () => {
  const navigate = useNavigate();
  
  

  

  

  return (
    <FlexGrid fullWidth className="page">
      <PageHeader
        title="Account"
        description="Your account information"
        renderIcon={<User size={42} />}
      />

      <Row>
        <Column>
          <Stack orientation="horizontal" gap={12}>
            <div>
              <FormLabel>ID</FormLabel>
              <p>{"N/A"}</p>
            </div>
            <div>
              <FormLabel>Name</FormLabel>
              <p>{ "N/A"}</p>
            </div>
          </Stack>
          <Spacer h={5} />
          <FormLabel>Role</FormLabel>
          <p>{"N/A"}</p>
          <Spacer h={5} />
          <FormLabel>Export Type(s)</FormLabel>
          <p>{"N/A"}</p>
          <Spacer h={5} />

          <FormLabel>Occupation</FormLabel>
          <p>{"N/A"}</p>
          <Spacer h={5} />

          <FormLabel>Email</FormLabel>
          <p>{ "N/A"}</p>
          <Spacer h={5} />

          <FormLabel>Phone number</FormLabel>
          <p>{"N/A"}</p>
          <Spacer h={5} />
          <Stack orientation="horizontal" gap={12}>
            <div>
              <FormLabel>region</FormLabel>
              <p>{}</p>
            </div>
            <div>
              <FormLabel>Site</FormLabel>
              <p>{}</p>
            </div>
          </Stack>
          <Spacer h={5} />
        </Column>
      </Row>

      <Spacer h={5} />
      <Button kind="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
    </FlexGrid>
  );
};

export default Account;
