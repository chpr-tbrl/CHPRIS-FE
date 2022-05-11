import React from "react";
import {
  Grid,
  Form,
  Stack,
  Column,
  Button,
  FormGroup,
  TextInput,
  Dropdown,
  PasswordInput,
} from "@carbon/react";
import { Link } from "react-router-dom";

const Signup = () => {
  const regions = ["North-West", "West", "South-West"];
  return (
    <Grid>
      <Column sm={0} lg={8} className="page__article">
        <div className="page__article--content">
          <h2>Lorem ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            debitis voluptate voluptatum, exercitationem reiciendis dolores
            voluptatibus, tempora amet delectus magnam accusantium quibusdam
            temporibus. Iste nisi nihil cum consequatur delectus eius?
          </p>
        </div>
      </Column>
      <Column sm={4} lg={8} className="page__form">
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

        <Form>
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

            <Button type="submit">Create account</Button>
          </Stack>
        </Form>
      </Column>
    </Grid>
  );
};

export default Signup;
