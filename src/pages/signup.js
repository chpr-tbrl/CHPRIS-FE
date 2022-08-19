import React, { Fragment, useState } from "react";
import {
  Grid,
  Form,
  Stack,
  Column,
  Button,
  Dropdown,
  FormGroup,
  TextInput,
  InlineLoading,
  PasswordInput,
  DropdownSkeleton,
  RadioButtonGroup,
  RadioButton,
  InlineNotification,
  Modal,
} from "@carbon/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SIGNUP_SCHEMA } from "schemas";
import { useSignupMutation } from "services";
import { useRegionsAndSites } from "hooks";
import { PhoneNumberInput } from "components";

import toast from "react-hot-toast";

const Signup = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SIGNUP_SCHEMA),
  });

  const {
    regions,
    sites,
    selectSite,
    selectRegion,
    loadingRegions,
    loadingSites,
  } = useRegionsAndSites(setValue);

  async function handleSignup(data) {
    try {
      await signup(data).unwrap();
      toast.success("Account created");
      setOpen(true);
    } catch (error) {
      // we handle errors with middleware
    }
  }

  return (
    <Grid fullWidth>
      <Column sm={0} md={4} lg={8} className="page--article">
        <div className="page--article__content">
          <h2 className="cds--type-semibold">CHPR-IS</h2>
          <p>
            for Center for Health Promotion and Research - Information System
          </p>
        </div>
      </Column>

      <Column sm={4} md={4} lg={8} className="page--form">
        <p>
          <span>Already have an account? </span>
          <Link className="cds--link" to="/login">
            log in
          </Link>
        </p>
        <h1>Create an account</h1>

        <Form onSubmit={handleSubmit(handleSignup)}>
          <Stack gap={7}>
            <FormGroup legendText="Personal Information">
              <Stack gap={7}>
                <TextInput
                  id="name"
                  labelText="Name"
                  {...register("name")}
                  invalid={errors.name ? true : false}
                  invalidText={errors.name?.message}
                />
                <TextInput
                  id="occupation"
                  labelText="Occupation"
                  {...register("occupation")}
                  invalid={errors.occupation ? true : false}
                  invalidText={errors.occupation?.message}
                />

                <PhoneNumberInput
                  control={control}
                  id="phone_number"
                  labelText="Phone number"
                  invalid={errors.phone_number ? true : false}
                  invalidText={errors.phone_number?.message}
                />
              </Stack>
            </FormGroup>

            <FormGroup legendText="Location information">
              {!regions.length ? (
                <InlineNotification
                  kind="info"
                  hideCloseButton
                  lowContrast
                  title="Missing regions"
                  subtitle="Sorry there are no available regions. Please contact administrator to create regions and sites"
                />
              ) : (
                <Stack gap={7}>
                  <Fragment>
                    {!loadingRegions ? (
                      <Dropdown
                        id="region"
                        titleText="Region"
                        label="Select region"
                        items={regions}
                        itemToString={(item) => item.name}
                        invalid={errors.region_id ? true : false}
                        invalidText={errors.region_id?.message}
                        onChange={(evt) => selectRegion(evt.selectedItem.id)}
                      />
                    ) : (
                      <DropdownSkeleton />
                    )}
                  </Fragment>

                  <Fragment>
                    {!loadingSites ? (
                      <Dropdown
                        id="site"
                        titleText="Site"
                        label="Select site"
                        items={sites}
                        itemToString={(item) => item.name}
                        invalid={errors.site_id ? true : false}
                        invalidText={errors.site_id?.message}
                        onChange={(evt) => selectSite(evt.selectedItem.id)}
                      />
                    ) : (
                      <DropdownSkeleton />
                    )}
                  </Fragment>
                </Stack>
              )}
            </FormGroup>

            <FormGroup legendText="Account Information">
              <Stack gap={7}>
                <TextInput
                  id="email"
                  labelText="Email"
                  type="email"
                  {...register("email")}
                  invalid={errors.email ? true : false}
                  invalidText={errors.email?.message}
                />
                <PasswordInput
                  id="password"
                  labelText="Password"
                  {...register("password")}
                  invalid={errors.password ? true : false}
                  invalidText={errors.password?.message}
                />
                <PasswordInput
                  id="confirm-password"
                  labelText="Confirm Password"
                  {...register("confirm_password")}
                  invalid={errors.confirm_password ? true : false}
                  invalidText={errors.confirm_password?.message}
                />

                <RadioButtonGroup
                  legendText="SMS notification type"
                  name="sms_notifications_type"
                  defaultSelected="positive"
                  onChange={(evt) =>
                    setValue("sms_notifications_type", evt, {
                      shouldValidate: true,
                    })
                  }
                >
                  <RadioButton
                    labelText="Positive"
                    value="positive"
                    id="positive"
                  />
                  <RadioButton labelText="All" value="all" id="all" />
                </RadioButtonGroup>
              </Stack>
            </FormGroup>

            {!isLoading ? (
              <Button type="submit" disabled={!regions?.length}>
                Create account
              </Button>
            ) : (
              <InlineLoading
                status="active"
                iconDescription="Active loading indicator"
                description="Loading data..."
              />
            )}
          </Stack>
        </Form>
      </Column>
      <Modal
        open={open}
        passiveModal
        onRequestClose={() => {
          setOpen(false);
          navigate("/login");
        }}
      >
        <Stack gap={7}>
          <h4>Account created</h4>
          <p> You will be notified when your acccount is approved </p>
        </Stack>
      </Modal>
    </Grid>
  );
};

export default Signup;
