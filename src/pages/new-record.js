import React, { useState } from "react";
import { PageHeader, TabBar, Spacer } from "components";
import {
  Tab,
  Tabs,
  Button,
  TabList,
  TabPanel,
  TabPanels,
  Dropdown,
  Stack,
  FlexGrid,
  Form,
  FormGroup,
  TextInput,
  RadioButton,
  Checkbox,
  DatePicker,
  NumberInput,
  InlineLoading,
  DatePickerInput,
  RadioButtonGroup,
} from "@carbon/react";

import { AddAlt } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NEW_RECORD_SCHEMA } from "schemas";
import { useNewRecordMutation } from "services";
import { useFetchedRegionsAndSites } from "hooks";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { useNavigate } from "react-router-dom";
import { handleSetValue } from "utils";
import toast from "react-hot-toast";

const NewRecord = () => {
  const [page, setPage] = useState(0);
  const auth = useSelector(authSelector);
  const navigate = useNavigate();
  const [newRecord, { isLoading }] = useNewRecordMutation();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NEW_RECORD_SCHEMA),
  });

  const { regions, sites, selectSite, selectRegion } =
    useFetchedRegionsAndSites(setValue);

  function togglePage(index) {
    setPage(index);
  }

  async function handleRecordCreation(data) {
    const request = {
      ...auth,
      ...data,
    };
    try {
      await newRecord(request).unwrap();
      toast.success("Record created");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  return (
    <FlexGrid fullWidth className="page">
      <TabBar />
      <PageHeader
        title="New record"
        description="Create a new client record"
        renderIcon={<AddAlt size={42} />}
      />
      <Spacer h={7} />
      <Tabs
        selectedIndex={page}
        onChange={(evt) => togglePage(evt.selectedIndex)}
      >
        <TabList aria-label="List of tabs" contained activation="manual">
          <Tab>Personal details</Tab>
          <Tab>Category and Symptoms</Tab>
        </TabList>
        <Form onSubmit={handleSubmit(handleRecordCreation)}>
          <TabPanels>
            <TabPanel>
              <Stack gap={7}>
                <TextInput
                  id="records_name"
                  labelText="Patient's Name"
                  {...register("records_name")}
                  invalid={errors.records_name ? true : false}
                  invalidText={errors.records_name?.message}
                />
                <NumberInput
                  id="age"
                  label="Age"
                  min={1}
                  allowEmpty={false}
                  {...register("records_age")}
                  invalid={errors.records_age ? true : false}
                  invalidText={errors.records_age?.message}
                  iconDescription="age"
                />
                <RadioButtonGroup
                  legendText="Sex"
                  name="records_sex"
                  defaultSelected="female"
                  onChange={(evt) =>
                    setValue("records_sex", evt, {
                      shouldValidate: true,
                    })
                  }
                >
                  <RadioButton labelText="Female" value="female" id="female" />
                  <RadioButton labelText="Male" value="male" id="male" />
                </RadioButtonGroup>

                <DatePicker
                  datePickerType="single"
                  maxDate={new Date()}
                  onChange={(evt) => {
                    handleSetValue(
                      "records_date_of_test_request",
                      evt[0],
                      setValue
                    );
                  }}
                >
                  <DatePickerInput
                    placeholder="mm/dd/yyyy"
                    labelText="Date of test request"
                    id="records_date_of_test_request"
                    invalid={errors.records_date_of_test_request ? true : false}
                    invalidText={errors.records_date_of_test_request?.message}
                  />
                </DatePicker>

                <TextInput
                  id="records_address"
                  labelText="Address"
                  {...register("records_address")}
                  invalid={errors.records_address ? true : false}
                  invalidText={errors.records_address?.message}
                />

                <TextInput
                  id="records_telephone"
                  labelText="Telephone"
                  {...register("records_telephone")}
                  invalid={errors.records_telephone ? true : false}
                  invalidText={errors.records_telephone?.message}
                />
                <TextInput
                  id="records_telephone_2"
                  labelText="Telephone(2)"
                  {...register("records_telephone_2")}
                />
                <RadioButtonGroup
                  legendText="Has ART unique code"
                  name="records_has_art_unique_code"
                  defaultSelected="unknown"
                  onChange={(evt) =>
                    setValue("records_has_art_unique_code", evt)
                  }
                >
                  <RadioButton labelText="yes" value="yes" id="yes" />
                  <RadioButton labelText="no" value="no" id="no" />
                  <RadioButton
                    labelText="unknown"
                    value="unknown"
                    id="unknown"
                  />
                </RadioButtonGroup>

                <TextInput
                  id="records_art_unique_code"
                  labelText="Record ART Unique code"
                  {...register("records_art_unique_code")}
                />

                <RadioButtonGroup
                  legendText="Status"
                  name="records_status"
                  defaultSelected="outpatient"
                  onChange={(evt) =>
                    setValue("records_status", evt, {
                      shouldValidate: true,
                    })
                  }
                >
                  <RadioButton
                    labelText="Outpatient"
                    value="outpatient"
                    id="outpatient"
                  />
                  <RadioButton
                    labelText="Ward-Bed"
                    value="ward-bed"
                    id="ward-bed"
                  />
                </RadioButtonGroup>

                <TextInput
                  id="records_ward_bed_number"
                  labelText="Ward bed number"
                  {...register("records_ward_bed_number")}
                />

                <RadioButtonGroup
                  legendText="Currently pregnant"
                  name="records_currently_pregnant"
                  defaultSelected="no"
                  onChange={(evt) =>
                    setValue("records_currently_pregnant", evt, {
                      shouldValidate: true,
                    })
                  }
                >
                  <RadioButton labelText="yes" value="yes" id="cp-yes" />
                  <RadioButton labelText="no" value="no" id="cp-no" />
                </RadioButtonGroup>
                <Button type="button" onClick={() => togglePage(1)}>
                  Continue
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack gap={7}>
                <FormGroup legendText="Symptoms">
                  <Checkbox
                    labelText="Current cough"
                    id="records_symptoms_current_cough"
                    {...register("records_symptoms_current_cough")}
                  />
                  <Checkbox
                    labelText="Fever"
                    id="records_symptoms_fever"
                    {...register("records_symptoms_fever")}
                  />
                  <Checkbox
                    labelText="Night sweats"
                    id="records_symptoms_night_sweats"
                    {...register("records_symptoms_night_sweats")}
                  />
                  <Checkbox
                    labelText="Weight loss"
                    id="records_symptoms_weight_loss"
                    {...register("records_symptoms_weight_loss")}
                  />
                  <Checkbox
                    labelText="None of the above"
                    id="records_symptoms_none_of_the_above"
                    {...register("records_symptoms_none_of_the_above")}
                  />
                </FormGroup>

                <FormGroup legendText="Patient Category">
                  <Checkbox
                    labelText="Hospitalized (HOS)"
                    id="records_patient_category_hospitalized"
                    {...register("records_patient_category_hospitalized")}
                  />
                  <Checkbox
                    labelText="Child (CHI)"
                    id="records_patient_category_child"
                    {...register("records_patient_category_child")}
                  />
                  <Checkbox
                    labelText="To initiate ART(ART)"
                    id="records_patient_category_to_initiate_art"
                    {...register("records_patient_category_to_initiate_art")}
                  />
                  <Checkbox
                    labelText="On ART symptomatic (PLH)"
                    id="records_patient_category_on_art_symptoma
                    tic"
                    {...register("records_patient_category_on_art_symptomatic")}
                  />
                  <Checkbox
                    labelText="Out Patient"
                    id="records_patient_category_outpatient"
                    {...register("records_patient_category_outpatient")}
                  />
                  <Checkbox
                    labelText="ANC"
                    id="records_patient_category_anc"
                    {...register("records_patient_category_anc")}
                  />
                  <Checkbox
                    labelText="Diabetes clinic"
                    id="records_patient_category_diabetes_clinic"
                    {...register("records_patient_category_diabetes_clinic")}
                  />
                  <Checkbox labelText="Other" id="has_orther" />
                  <TextInput
                    id="records_patient_category_other"
                    labelText="Other"
                    {...register("records_patient_category_other")}
                  />
                </FormGroup>

                <FormGroup legendText="Reason for test">
                  <Checkbox
                    labelText="Presumptive TB (Pre-treatment)"
                    id="records_reason_for_test_presumptive_tb"
                    {...register("records_reason_for_test_presumptive_tb")}
                  />
                </FormGroup>

                <FormGroup legendText="TB Treatment history">
                  <Stack gap={4}>
                    <RadioButtonGroup
                      legendText=""
                      name="tth"
                      defaultSelected="new"
                      orientation="vertical"
                      onChange={(evt) =>
                        setValue("records_tb_treatment_history", evt)
                      }
                    >
                      <RadioButton
                        labelText="New (never treated > 1 month"
                        value="new"
                        id="new"
                      />
                      <RadioButton
                        labelText="Relapse (completed previous TB Rx)"
                        value="relapse"
                        id="relapse"
                      />
                      <RadioButton
                        labelText="After loss to follow up(>= 2 months of Tx interruption)"
                        value="after_loss_to_follow_up"
                        id="after_loss_to_follow_up"
                      />
                      <RadioButton
                        labelText="Failure (2 smears AFB positive at >= 5 months on Rx)"
                        value="failure"
                        id="failure"
                      />
                    </RadioButtonGroup>
                    <Checkbox labelText="contact of TB patient" id="contact" />
                    <TextInput
                      labelText="Other"
                      id="records_tb_treatment_history_contact_of_tb_patient"
                      {...register(
                        "records_tb_treatment_history_contact_of_tb_patient"
                      )}
                    />
                  </Stack>
                </FormGroup>

                <FormGroup legendText="Community">
                  <Stack gap={7}>
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
                  {!isLoading ? (
                    <Button kind="primary" type="submit">
                      Create record
                    </Button>
                  ) : (
                    <InlineLoading
                      status="active"
                      iconDescription="Active loading indicator"
                      description="Loading data..."
                    />
                  )}
                </div>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Form>
      </Tabs>
    </FlexGrid>
  );
};

export default NewRecord;
