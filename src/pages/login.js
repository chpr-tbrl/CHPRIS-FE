import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleLogin(evt) {
    evt.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 3000);
  }

  return (
    <Grid fullWidth>
      <Column sm={0} md={4} lg={8} className="page--article">
        <div className="page--article__content">
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            debitis voluptate voluptatum, exercitationem reiciendis dolores
            voluptatibus, tempora amet delectus magnam accusantium quibusdam
            temporibus. Iste nisi nihil cum consequatur delectus eius?
          </p>
        </div>
      </Column>
      <Column sm={4} md={4} lg={8} className="page--form">
        <Stack gap={7}>
          <h1>
            Login to CHPR <span className="cds--type-semibold">IS</span>
          </h1>
          <Form onSubmit={(evt) => handleLogin(evt)}>
            <Stack gap={7}>
              <TextInput id="email" labelText="Email" type="email" />
              <FormGroup>
                <FormLabel className="password--label">
                  <span>Password</span>
                  <Link className="cds--link" to="/password-reset">
                    Forgot password?
                  </Link>
                </FormLabel>
                <PasswordInput id="password" hideLabel />
              </FormGroup>

              {!loading ? (
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
