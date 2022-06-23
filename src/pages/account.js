import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { PageHeader, Spacer, TabBar } from "components";
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
  PasswordInput,
  ListItem,
  ModalHeader,
  InlineLoading,
  Loading,
} from "@carbon/react";
import { User } from "@carbon/icons-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authSelector, logout } from "features";
import { useSelector, useDispatch } from "react-redux";
import { USER_UPDATE_SCHEMA } from "schemas";
import { useProfile, useDeviceDetection } from "hooks";
import { useUpdateProfileMutation } from "services";

const Account = () => {
  const submitBtnRef = useRef(null);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const { account, fetchingProfile } = useProfile(auth.uid);
  const isMobile = useDeviceDetection();
  const [modal, showModal] = useState(false);
  const [modalTwo, showModalTwo] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  function togglePasswordModal() {
    showModal(!modal);
  }

  function toggleAccountModal() {
    showModalTwo(!modalTwo);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(USER_UPDATE_SCHEMA),
  });

  async function handlePasswordUpdate(data) {
    try {
      await updateProfile(data).unwrap();
      toast.success("Password updated");
      if (modal) {
        toast.success("Please login");
        dispatch(logout());
      }
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (fetchingProfile) return <Loading />;

  return (
    <FlexGrid fullWidth className="page">
      {isMobile && <TabBar />}
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

      <Button kind="secondary" onClick={() => togglePasswordModal(true)}>
        Change password
      </Button>

      <Button type="button" onClick={() => toggleAccountModal(true)}>
        Update account
      </Button>

      <ComposedModal
        size="sm"
        open={modal}
        onRequestClose={() => togglePasswordModal()}
        preventCloseOnClickOutside
      >
        <ModalHeader
          title="Password update"
          buttonOnClick={() => togglePasswordModal()}
        />
        <ModalBody aria-label="create new password">
          <Form onSubmit={handleSubmit(handlePasswordUpdate)}>
            <Stack gap={7}>
              <p>Create a new password</p>
              <PasswordInput
                required
                id="current_password"
                labelText="Enter old password"
                {...register("current_password")}
                invalid={errors.current_password ? true : false}
                invalidText={errors.current_password?.message}
              />
              <PasswordInput
                id="new_password"
                labelText="Enter new password"
                {...register("new_password")}
                invalid={errors.new_password ? true : false}
                invalidText={errors.new_password?.message}
              />
              <PasswordInput
                id="confirmPassword"
                labelText="Confirm new password"
                {...register("confirmPassword")}
                invalid={errors.confirmPassword ? true : false}
                invalidText={errors.confirmPassword?.message}
              />
            </Stack>
            <button
              type="submit"
              ref={submitBtnRef}
              hidden
              aria-label="submit"
            ></button>
          </Form>
        </ModalBody>
        <ModalFooter>
          {!isLoading ? (
            <Button type="button" onClick={() => submitBtnRef.current.click()}>
              Save
            </Button>
          ) : (
            <InlineLoading
              status="active"
              iconDescription="Active loading indicator"
              description="processing ..."
              style={{ justifyContent: "end", paddingRight: "20px" }}
            />
          )}
        </ModalFooter>
      </ComposedModal>
      <ComposedModal
        size="sm"
        open={modalTwo}
        onRequestClose={() => toggleAccountModal()}
        preventCloseOnClickOutside
      >
        <ModalHeader
          title="Password update"
          buttonOnClick={() => toggleAccountModal()}
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
            <Button type="button" onClick={() => submitBtnRef.current.click()}>
              Save
            </Button>
          </ModalFooter>
        </Form>
      </ComposedModal>
    </FlexGrid>
  );
};

export default Account;
