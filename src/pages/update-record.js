import React, { useEffect } from "react";
import toast from "react-hot-toast";
import {
  Form,
  Stack,
  Column,
  Button,
  Loading,
  Checkbox,
  Dropdown,
  FlexGrid,
  FormGroup,
  TextInput,
  RadioButton,
  NumberInput,
  InlineLoading,
  RadioButtonGroup,
} from "@carbon/react";
import { UserProfile } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { NEW_RECORD_SCHEMA } from "schemas";
import { useUpdateRecordMutation, useGetRecordQuery } from "services";
import {
  PageHeader,
  PhoneNumberInput,
  Spacer,
  TabBar,
  DatePicker,
} from "components";
import { useFetchedRegionsAndSites, useDeviceDetection } from "hooks";
import { getSelectedItem } from "utils";

const UpdateRecord = () => {
  const { id } = useParams();
  const isMobile = useDeviceDetection();
  const navigate = useNavigate();
  const [updateRecord, { isLoading }] = useUpdateRecordMutation();
  const { data: record = [], isFetching } = useGetRecordQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NEW_RECORD_SCHEMA),
  });

  const isFemale = watch("records_sex", "female") === "female";
  const hasARTCode = watch("records_has_art_unique_code", "no") === "yes";
  const isHospitalized = watch("records_status", "outpatient") === "ward-bed";

  const { regions, sites, selectSite, selectRegion } =
    useFetchedRegionsAndSites(setValue);

  useEffect(() => {
    if (record.length) {
      reset(record[0]);
      selectRegion(record[0].region_id);
    }
  }, [record, reset, selectRegion]);

  async function handleUpdate(data) {
    try {
      await updateRecord(data).unwrap();
      toast.success("Record updated");
      navigate("../details");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isFetching) return <Loading />;

  return (
    <FlexGrid className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        {isMobile && <TabBar />}
        <PageHeader
          title="Update record"
          description="update current record"
          renderIcon={<UserProfile size={42} />}
        />
        <Spacer h={7} />
        <Form onSubmit={handleSubmit(handleUpdate)}>
          <Stack gap={7}>
            <TextInput
              id="records_name"
              labelText="Name"
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
              valueSelected={watch("records_sex")}
              onChange={(evt) =>
                setValue("records_sex", evt, {
                  shouldValidate: true,
                })
              }
            >
              <RadioButton labelText="Female" value="female" id="female" />
              <RadioButton labelText="Male" value="male" id="male" />
              <RadioButton labelText="Unkown" value="unknown" id="unknown" />
            </RadioButtonGroup>

            <DatePicker
              control={control}
              labelText="Date of test request"
              id="records_date_of_test_request"
              invalid={errors.records_date_of_test_request ? true : false}
              invalidText={errors.records_date_of_test_request?.message}
            />

            <TextInput
              id="records_address"
              labelText="Address"
              {...register("records_address")}
              invalid={errors.records_address ? true : false}
              invalidText={errors.records_address?.message}
            />

            <PhoneNumberInput
              control={control}
              id="records_telephone"
              labelText="Telephone"
              invalid={errors.records_telephone ? true : false}
              invalidText={errors.records_telephone?.message}
            />

            <PhoneNumberInput
              control={control}
              id="records_telephone_2"
              labelText="Telephone(2)"
            />

            <RadioButtonGroup
              legendText="Has ART unique code"
              name="records_has_art_unique_code"
              valueSelected={watch("records_has_art_unique_code")}
              onChange={(evt) => setValue("records_has_art_unique_code", evt)}
            >
              <RadioButton labelText="yes" value="yes" id="yes" />
              <RadioButton labelText="no" value="no" id="no" />
              <RadioButton labelText="unknown" value="unknown" id="unknown" />
            </RadioButtonGroup>

            {hasARTCode && (
              <TextInput
                id="records_art_unique_code"
                labelText="Record ART Unique code"
                {...register("records_art_unique_code")}
                invalid={errors.records_art_unique_code ? true : false}
                invalidText={errors.records_art_unique_code?.message}
              />
            )}

            <RadioButtonGroup
              legendText="Status"
              name="records_status"
              valueSelected={watch("records_status")}
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

            {isHospitalized && (
              <TextInput
                id="records_ward_bed_number"
                labelText="Ward bed number"
                {...register("records_ward_bed_number")}
                invalid={errors.records_ward_bed_number ? true : false}
                invalidText={errors.records_ward_bed_number?.message}
              />
            )}

            <RadioButtonGroup
              legendText="Currently pregnant"
              name="records_currently_pregnant"
              valueSelected={watch("records_currently_pregnant")}
              onChange={(evt) =>
                setValue("records_currently_pregnant", evt, {
                  shouldValidate: true,
                })
              }
            >
              <RadioButton
                disabled={!isFemale}
                labelText="yes"
                value="yes"
                id="cp-yes"
              />
              <RadioButton labelText="no" value="no" id="cp-no" />
            </RadioButtonGroup>

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

            <RadioButtonGroup
              legendText="TB type"
              name="records_tb_type"
              orientation="vertical"
              valueSelected={watch("records_tb_type")}
              onChange={(evt) =>
                setValue("records_tb_type", evt, {
                  shouldValidate: true,
                })
              }
            >
              <RadioButton
                labelText="Pulmonary"
                id="pulmonary"
                value="pulmonary"
              />
              <RadioButton
                labelText=" Extrapulmonary"
                id="extrapulmonary"
                value="extrapulmonary"
              />
              <RadioButton
                labelText="Pulmonary and Extrapulmonary"
                id="pulmonary_and_extrapulmonary"
                value="pulmonary_and_extrapulmonary"
              />
              <RadioButton labelText="Unknown" id="unknown" value="unknown" />
            </RadioButtonGroup>

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
              <Stack gap={5}>
                <RadioButtonGroup
                  legendText=""
                  valueSelected={watch("records_tb_treatment_history")}
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
                    labelText="After loss to follow up(>= 2 months of Tx interruption)"
                    value="after_loss_to_follow_up"
                    id="after_loss_to_follow_up"
                  />
                  <RadioButton
                    labelText="Relapse after retreatment regimen"
                    id="relapse_after_retreatment_regimen"
                    value="relapse_after_retreatment_regimen"
                  />
                  <RadioButton
                    labelText="Failure after retreatment regimen"
                    id="failure_after_retreatment_regimen"
                    value="failure_after_retreatment_regimen"
                  />
                  <RadioButton
                    labelText="Default after retreatment regimen"
                    id="default_after_retreatment_regimen"
                    value="default_after_retreatment_regimen"
                  />
                  <RadioButton
                    labelText="Currently on MDR regimen"
                    id="currently_on_mdr_regimen"
                    value="currently_on_mdr_regimen"
                  />
                  <RadioButton
                    labelText="Relapse after MDR regimen"
                    id="relapse_after_mdr_regimen"
                    value="relapse_after_mdr_regimen"
                  />
                  <RadioButton
                    labelText="Failure after MDR regimen"
                    id="failure_after_mdr_regimen"
                    value="failure_after_mdr_regimen"
                  />
                  <RadioButton
                    labelText="Default after MDR regimen"
                    id="default_after_mdr_regimen"
                    value="default_after_mdr_regimen"
                  />
                  <RadioButton
                    labelText="MDR-TB Contact"
                    id="mdr_tb_contact"
                    value="mdr_tb_contact"
                  />
                  <RadioButton
                    labelText="Prisoner, TB treatment history unknown"
                    id="prisoner_tb_treatment_history_unknown"
                    value="prisoner_tb_treatment_history_unknown"
                  />
                  <RadioButton
                    labelText="Unknown"
                    id="unknown"
                    value="unknown"
                  />
                  <RadioButton labelText="Other" id="other" value="other" />
                </RadioButtonGroup>

                <TextInput
                  labelText="Contact of TB patient"
                  id="records_tb_treatment_history_contact_of_tb_patient"
                  {...register(
                    "records_tb_treatment_history_contact_of_tb_patient"
                  )}
                />
              </Stack>
            </FormGroup>

            <TextInput
              id="records_tb_treatment_number"
              labelText="TB treatment number"
              {...register("records_tb_treatment_number")}
              invalid={errors.records_tb_treatment_number ? true : false}
              invalidText={errors.records_tb_treatment_number?.message}
            />

            <FormGroup legendText="Community">
              <Stack gap={7}>
                <Dropdown
                  id="region"
                  titleText="Region"
                  label="Select region"
                  items={regions}
                  initialSelectedItem={getSelectedItem(
                    regions,
                    record[0].region_id
                  )}
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
                  initialSelectedItem={getSelectedItem(
                    sites,
                    record[0].site_id
                  )}
                  itemToString={(item) => item.name}
                  invalid={errors.site_id ? true : false}
                  invalidText={errors.site_id?.message}
                  onChange={(evt) => selectSite(evt.selectedItem.id)}
                />
              </Stack>
            </FormGroup>

            <FormGroup legendText="SMS notifications">
              <Checkbox
                labelText="Do you want to be notified when results are ready by an automated SMS message"
                id="records_sms_notifications"
                {...register("records_sms_notifications")}
              />
            </FormGroup>

            {!isLoading ? (
              <Button kind="secondary" type="submit">
                Update
              </Button>
            ) : (
              <InlineLoading
                status="active"
                iconDescription="Active loading indicator"
                description="Processing ..."
              />
            )}
          </Stack>
        </Form>
      </Column>
    </FlexGrid>
  );
};

export default UpdateRecord;
