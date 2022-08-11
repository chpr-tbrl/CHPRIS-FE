import React from "react";
import { Grid, Form, Stack, Column, Button, TextInput } from "@carbon/react";

const PasswordReset = () => {
  return (
    <Grid fullWidth>
      <Column sm={0} md={4} lg={8} className="page--article">
      <div className="page--article__content">
          <h2 className="cds--type-semibold">CHPR</h2>
          <p>Center for Health Promotion and Research</p>
        </div>
      </Column>
      <Column sm={4} md={4} lg={8} className="page--form">
        <h1>Forgot password?</h1>
        <p>Enter your email below to reset your password</p>
        <Form>
          <Stack gap={7}>
            <TextInput id="email" labelText="Email" type="email" />
            <Button type="submit">Continue</Button>
          </Stack>
        </Form>
      </Column>
    </Grid>
  );
};

export default PasswordReset;
