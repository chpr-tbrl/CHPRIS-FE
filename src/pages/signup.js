import React, { useState } from "react";
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
} from "@carbon/react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const regions = ["North-West", "West", "South-West"];

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSignup(evt) {
    evt.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 3000);
  }

  return (
    <Grid>
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
        <p>
          <span>Already have an account </span>
          <Link className="cds--link" to="login">
            log in
          </Link>
        </p>
        <h1>Create an account</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore soluta
          dolorum facere vel repellendus repellat rem iusto, blanditiis ex
          dolorem.
        </p>

        <Form onSubmit={(evt) => handleSignup(evt)}>
          <Stack gap={7}>
            <FormGroup legendText="Personal Information">
              <Stack gap={7}>
                <TextInput id="name" labelText="Name" />
                <TextInput id="occupation" labelText="Occupation" />
                <TextInput id="phone_number" labelText="Phone Number" />
              </Stack>
            </FormGroup>

            <FormGroup legendText="Location information">
              <Stack gap={7}>
                <Dropdown
                  id="region"
                  titleText="Region"
                  label="Select region"
                  items={regions}
                  itemToString={(item) => item}
                />
                <TextInput id="site" labelText="Site" />
              </Stack>
            </FormGroup>

            <FormGroup legendText="Account Information">
              <Stack gap={7}>
                <TextInput id="email" labelText="Email" type="email" />
                <PasswordInput
                  id="password"
                  labelText="Password"
                  type="password"
                />
                <PasswordInput
                  id="confirm-password"
                  labelText="Confirm Password"
                  type="password"
                />
              </Stack>
            </FormGroup>

            {!loading ? (
              <Button type="submit">Create account</Button>
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
    </Grid>
  );
};

export default Signup;
