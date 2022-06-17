import React, { useState } from "react";
import { PageHeader, Spacer } from "components";
import {
  Button,
  FormLabel,
  FlexGrid,
  Row,
  Form,
  Column,
  Stack,
  TextInput,
  ModalBody,
  ModalFooter,
  ComposedModal,
  ModalHeader,
} from "@carbon/react";
import { User } from "@carbon/icons-react";

const Account = () => {
  

  const [open, setOpen] = useState(false);
  const [show, showOpen] = useState(false);

  function closeActions() {
    showOpen(false);
    
    setOpen(false);
  }


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
              <p>{"N/A"}</p>
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
          <p>{"N/A"}</p>
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

      <Button kind="secondary" onClick={() => setOpen(true)}>
        Change password
      </Button>

      <Button type="button"  onClick={() => showOpen(true)}>Update account</Button>

      <ComposedModal
        size="sm"
        open={open}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <ModalHeader
          title="Password update"
          buttonOnClick={() => setOpen(false)}
        />
        <Form>
          <ModalBody aria-label="create new password">
            <Stack gap={7}>
              <p>Create a new password</p>
              <TextInput id="name" labelText="Enter old password" />
              <TextInput id="name" labelText="Enter new password" />
              <TextInput id="name" labelText="Confirm password" />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type="button" onClick={() => closeActions()}>
              Save
            </Button>
          </ModalFooter>
        </Form>
      </ComposedModal>
      <ComposedModal
        size="sm"
        open={show}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <ModalHeader
          title="Password update"
          buttonOnClick={() => showOpen(false)}
        />
        <Form>
          <ModalBody aria-label="update account information">
            <Stack gap={7}>
              <p>Change account information</p>
              <TextInput id="name" labelText="Phone number " />
              <TextInput id="name" labelText="Occupation" />
              
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type="button" onClick={() => closeActions()}>
              Save
            </Button>
          </ModalFooter>
        </Form>
      </ComposedModal>
    </FlexGrid>
  );
};

export default Account;
