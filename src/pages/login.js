import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_SCHEMA } from "schemas";
import { useLoginMutation } from "services";
import { useDispatch } from "react-redux";
import { saveAuth } from "features";
import {
  Grid,
  Form,
  Stack,
  Column,
  Button,
  TextInput,
  FormLabel,
  FormGroup,
  PasswordInput,
  InlineLoading,
} from "@carbon/react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  function checkAuth({ account_status }) {
    return account_status === "approved";
  }

  async function handleLogin(data) {
    try {
      const user = await login(data).unwrap();
      if (!checkAuth(user)) {
        toast.error("Forbidden, you  are not authorized");
        return;
      }
      toast.success("login successful");
      dispatch(saveAuth(user));
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  return (
    <Grid fullWidth>
      <Column sm={0} md={4} lg={8} className="page--article">
        <div className="page--article__content">
          <h2 className="cds--type-semibold">CHPR</h2>
          <p>Center for Health Promotion and Research</p>
        </div>
      </Column>
      <Column sm={4} md={4} lg={8} className="page--form">
        <Stack gap={7}>
          <h1>
            Login to CHPR <span className="cds--type-semibold">IS</span>
          </h1>
          <Form onSubmit={handleSubmit(handleLogin)}>
            <Stack gap={7}>
              <TextInput
                id="email"
                labelText="Email"
                type="email"
                {...register("email")}
                invalid={errors.email ? true : false}
                invalidText={errors.email?.message}
              />
              <FormGroup legendText="">
                <FormLabel className="password--label">
                  <span>Password</span>
                  <Link className="cds--link" to="/password-reset">
                    Forgot password?
                  </Link>
                </FormLabel>
                <PasswordInput
                  id="password"
                  hideLabel
                  labelText="password"
                  {...register("password")}
                  invalid={errors.password ? true : false}
                  invalidText={errors.password?.message}
                />
              </FormGroup>

              {!isLoading ? (
                <Button type="submit">Continue</Button>
              ) : (
                <InlineLoading
                  status="active"
                  iconDescription="Active loading indicator"
                  description="Loading data..."
                />
              )}

              <p className="account--link">
                <span>Don't have an account? </span>
                <Link className="cds--link" to="/signup">
                  create an account
                </Link>
              </p>
            </Stack>
          </Form>
        </Stack>
      </Column>
    </Grid>
  );
};

export default Login;
