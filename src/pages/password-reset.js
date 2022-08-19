import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Grid,
  Form,
  Stack,
  Column,
  Button,
  TextInput,
  NumberInput,
  InlineLoading,
  PasswordInput,
  ActionableNotification,
} from "@carbon/react";
import { Spacer } from "components";
import {
  useRecoveryMutation,
  useInitOTPMutation,
  useValidateOTPMutation,
  usePasswordResetMutation,
} from "services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PASSWORD_RESET_SCHEMA } from "schemas";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [tel, setTel] = useState("");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [recovery, { isLoading }] = useRecoveryMutation();
  const [initOTP, { isLoading: otpLoading }] = useInitOTPMutation();
  const [
    validateOTP,
    { isLoading: isValidating, isError: otpValidationError },
  ] = useValidateOTPMutation();
  const [passwordReset, { isLoading: resetting }] = usePasswordResetMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PASSWORD_RESET_SCHEMA),
  });

  async function requestOTP(data) {
    try {
      await initOTP(data).unwrap();
      toast.success("Verification code sent");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handleRecovery(evt) {
    evt.preventDefault();
    const request = {
      email: evt.target.email.value,
    };
    try {
      const response = await recovery(request).unwrap();
      toast.success("We found your account!");
      setTel(response.phone_number);
      // send otp verification code
      requestOTP(response);
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handleCodeVerify(evt) {
    evt.preventDefault();
    const request = {
      phone_number: tel,
      code: code,
    };
    try {
      await validateOTP(request).unwrap();
      toast.success("Code verified");
      setVerified(true);
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handlePasswordReset(data) {
    try {
      await passwordReset(data).unwrap();
      toast.success("Password changed, please login");
      navigate("/login");
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
      {!tel && (
        <Column sm={4} md={4} lg={8} className="page--form">
          <h1>Forgot password?</h1>
          <p>Enter your email below to reset your password</p>
          <Spacer h={7} />
          <Form onSubmit={(evt) => handleRecovery(evt)}>
            <Stack gap={7}>
              <TextInput
                id="email"
                labelText="Email"
                type="email"
                name="email"
                required
              />
              {!isLoading || otpLoading ? (
                <Button type="submit">Continue</Button>
              ) : (
                <InlineLoading
                  status="active"
                  iconDescription="Active loading indicator"
                  description="processing ..."
                />
              )}
            </Stack>
          </Form>
        </Column>
      )}

      {tel && !verified && (
        <Column sm={4} md={4} lg={8} className="page--form">
          <h1>We found your account!</h1>
          <p>
            We have sent a one time reset code to your phone number &nbsp;
            <span className="cds--type-semibold">
              {tel.replace(tel.substring(4, 9), "XXXXX")}
            </span>
          </p>
          <br />
          <p>Enter it below to verify your account</p>
          <br />
          <Form onSubmit={(evt) => handleCodeVerify(evt)}>
            <Stack gap={7}>
              <NumberInput
                id="code"
                label="code"
                name="code"
                allowEmpty
                hideSteppers
                defaultValue=""
                iconDescription="code"
                onChange={(_, { value }) => setCode(value)}
                required
              />
              {otpValidationError && (
                <ActionableNotification
                  inline
                  kind="error"
                  title="An error occured"
                  subtitle="code may have expired"
                  lowContrast
                  hideCloseButton
                  actionButtonLabel="try again"
                  onActionButtonClick={() => setTel("")}
                />
              )}
              {!isValidating ? (
                <Button type="submit">Continue</Button>
              ) : (
                <InlineLoading
                  status="active"
                  iconDescription="Active loading indicator"
                  description="processing ..."
                />
              )}
            </Stack>
          </Form>
        </Column>
      )}

      {verified && (
        <Column sm={4} md={4} lg={8} className="page--form">
          <h1>Reset password</h1>
          <br />
          <Form onSubmit={handleSubmit(handlePasswordReset)}>
            <Stack gap={7}>
              <PasswordInput
                id="new_password"
                labelText="Password"
                {...register("new_password")}
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
              {!resetting ? (
                <Button type="submit">Continue</Button>
              ) : (
                <InlineLoading
                  status="active"
                  iconDescription="Active loading indicator"
                  description="processing ..."
                />
              )}
            </Stack>
          </Form>
        </Column>
      )}
    </Grid>
  );
};

export default PasswordReset;
