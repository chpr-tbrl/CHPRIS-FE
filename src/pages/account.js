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
  UnorderedList,
  ListItem,
  ModalHeader,
  Loading,
} from "@carbon/react";
import { User } from "@carbon/icons-react";
import { authSelector } from "features";
import { useSelector } from "react-redux";
import { useProfile } from "hooks";

const Account = () => {
  const auth = useSelector(authSelector);
  const { account, fetchingProfile } = useProfile(auth.uid);
  const [open, setOpen] = useState(false);
  const [show, showOpen] = useState(false);

  function closeActions() {
    showOpen(false);
    setOpen(false);
  }

  if (fetchingProfile) return <Loading />;

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
              <p>{account?.id || "N/A"}</p>
            </div>
            <div>
              <FormLabel>Name</FormLabel>
              <p>{account?.name || "N/A"}</p>
            </div>
          </Stack>
          <Spacer h={5} />
          <FormLabel>Role</FormLabel>
          <p>{account?.account_type || "N/A"}</p>
          <Spacer h={5} />
          <FormLabel>Export Type(s)</FormLabel>
          <p>{account?.permitted_export_types.toString() || "N/A"}</p>
          <Spacer h={5} />

          <FormLabel>Occupation</FormLabel>
          <p>{account?.occupation || "N/A"}</p>
          <Spacer h={5} />

          <FormLabel>Email</FormLabel>
          <p>{account?.email || "N/A"}</p>
          <Spacer h={5} />

          <FormLabel>Phone number</FormLabel>
          <p>{account?.phone_number || "N/A"}</p>
          <Spacer h={5} />
          <FormLabel>Sites</FormLabel>

          {account?.users_sites?.map((site) => (
            <UnorderedList>
              <ListItem>{site.region.name}</ListItem>
              <UnorderedList nested>
                <ListItem>{site.name}</ListItem>
              </UnorderedList>
            </UnorderedList>
          ))}
          <Spacer h={5} />
        </Column>
      </Row>

      <Spacer h={5} />

      <Button kind="secondary" onClick={() => setOpen(true)}>
        Change password
      </Button>

      <Button type="button" onClick={() => showOpen(true)}>
        Update account
      </Button>

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
