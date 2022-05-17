import React, { useState } from "react";
import { PageHeader } from "components";
import {
  Tab,
  Tabs,
  Button,
  TabList,
  TabPanel,
  TabPanels,
  Dropdown,
  Stack,
  Form,
  FormGroup,
  TextInput,
  RadioButton,
  RadioButtonGroup,
  Checkbox,
} from "@carbon/react";

const NewRecord = () => {
  const regions = ["FCS Test Region", "West", "South-West"];
  const sites = ["Afkanerd Developers", "They rest"];

  const [page, setPage] = useState(0);

  function togglePage(index) {
    setPage(index);
  }

  return (
    <div className="page">
      <PageHeader title="New record" description="Create a new client record" />
      <Tabs
        selectedIndex={page}
        onChange={(evt) => togglePage(evt.selectedIndex)}
      >
        <TabList aria-label="List of tabs" contained>
          <Tab>Personal details</Tab>
          <Tab>Category and Symptoms</Tab>
        </TabList>
        <Form onSubmit={(evt) => console.log(evt)}>
          <TabPanels>
            <TabPanel>
              <Stack gap={7}>
                <TextInput id="name" labelText="Patient's Name" />
                <TextInput id="age" labelText="Age" />
                <RadioButtonGroup
                  legendText="Sex"
                  name="Sex"
                  defaultSelected="female"
                >
                  <RadioButton labelText="Female" value="female" id="female" />
                  <RadioButton labelText="Male" value="male" id="male" />
                </RadioButtonGroup>
                <TextInput id="phone_number" labelText="Phone Number" />
                <TextInput id="phone_number2" labelText="Phone Number (2)" />
                <RadioButtonGroup
                  legendText="Has ART unique code"
                  name="Has ART unique code"
                  defaultSelected="unknown"
                >
                  <RadioButton labelText="yes" value="yes" id="yes" />
                  <RadioButton labelText="no" value="no" id="no" />
                  <RadioButton
                    labelText="unknown"
                    value="unknown"
                    id="unknown"
                  />
                </RadioButtonGroup>

                <RadioButtonGroup
                  legendText="Status"
                  name="status"
                  defaultSelected="out-patient"
                >
                  <RadioButton
                    labelText="Outpatient"
                    value="out-patient"
                    id="out-patient"
                  />
                  <RadioButton
                    labelText="Ward-Bed"
                    value="ward-bed"
                    id="ward-bed"
                  />
                </RadioButtonGroup>

                <RadioButtonGroup
                  legendText="Currently pregnant"
                  name="currently pregnant"
                  defaultSelected="no"
                >
                  <RadioButton labelText="yes" value="yes" id="yes" />
                  <RadioButton labelText="no" value="no" id="no" />
                </RadioButtonGroup>
                <Button type="button" onClick={() => togglePage(1)}>
                  Continue
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack gap={7}>
                <FormGroup legendText="Symptoms">
                  <Checkbox labelText="Current cough" id="current-cough" />
                  <Checkbox labelText="Fever" id="fever" />
                  <Checkbox labelText="Night sweats" id="night-sweats" />
                  <Checkbox labelText="Weight loss" id="weight-loss" />
                  <Checkbox labelText="None of the above" id="none" />
                </FormGroup>

                <FormGroup legendText="Patient Category">
                  <Checkbox labelText="Hospitalized (HOS)" id="hospitalized" />
                  <Checkbox labelText="Child (CHI)" id="child" />
                  <Checkbox labelText="To initiate ART(ART)" id="art" />
                  <Checkbox labelText="On ART symptomatic (PLH)" id="" />
                  <Checkbox labelText="Out Patient" id="" />
                  <Checkbox labelText="ANC" id="" />
                  <Checkbox labelText="Diabetes clinic" id="" />
                  <Checkbox labelText="Other" id="" />
                  <TextInput id="other-value" labelText="Other" />
                </FormGroup>

                <FormGroup legendText="Reason for test">
                  <Checkbox labelText="Presumptive TB (Pre-treatment)" id="" />
                </FormGroup>

                <FormGroup legendText="TB Treatment history">
                  <Stack gap={4}>
                    <RadioButtonGroup
                      legendText=""
                      name="tth"
                      defaultSelected="new"
                      orientation="vertical"
                    >
                      <RadioButton
                        labelText="New (never treated > 1 month"
                        value="new"
                        id="new"
                      />
                      <RadioButton
                        labelText="Relapse (completed previous TB Rx)"
                        value="re"
                        id="re"
                      />
                      <RadioButton
                        labelText="After loss to follow up(>= 2 months of Tx interruption)"
                        value="al"
                        id="al"
                      />
                      <RadioButton
                        labelText="Failure (2 smears AFB positive at >= 5 months on Rx)"
                        value="failure"
                        id="failure"
                      />
                    </RadioButtonGroup>
                    <Checkbox labelText="contact of TB patient" id="contact" />
                    <TextInput id="tbt-other-value" labelText="Other" />
                  </Stack>
                </FormGroup>

                <FormGroup legendText="Community">
                  <Stack gap={4}>
                    <Dropdown
                      id="region"
                      titleText="Region"
                      label="Select region"
                      items={regions}
                      itemToString={(item) => item}
                    />
                    <Dropdown
                      id="site"
                      titleText="Site"
                      label="Select site"
                      items={sites}
                      itemToString={(item) => item}
                    />
                  </Stack>
                </FormGroup>
                <div>
                  <Button
                    kind="secondary"
                    type="button"
                    onClick={() => togglePage(0)}
                  >
                    Back
                  </Button>
                  <Button kind="primary" type="submit">
                    Create record
                  </Button>
                </div>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Form>
      </Tabs>
    </div>
  );
};

export default NewRecord;
