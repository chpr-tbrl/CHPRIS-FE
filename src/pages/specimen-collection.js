import React, { Fragment, useEffect } from "react";
import { PageHeader, Spacer, TabBar } from "components";
import {
  Stack,
  Form,
  Button,
  FormGroup,
  TextInput,
  RadioButton,
  FormLabel,
  RadioButtonGroup,
  DatePicker,
  DatePickerInput,
  InlineLoading,
  FlexGrid,
  Loading,
} from "@carbon/react";
import { PillsAdd } from "@carbon/icons-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SPECIMEN_COLLECTION_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector, authSelector } from "features";
import { useNewSpecimenMutation, useGetSpecimensQuery } from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SpecimenCollection = () => {
  const record = useSelector(recordSelector);
  const auth = useSelector(authSelector);
  const navigate = useNavigate();
  const [newSpecimen, { isLoading }] = useNewSpecimenMutation();

  const { data: specimens = [], isLoading: fetchingSpecimens } =
    useGetSpecimensQuery({
      ...auth,
      record_id: record.record_id,
    });

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SPECIMEN_COLLECTION_SCHEMA),
  });

  useEffect(() => {
    if (specimens.length) {
      reset(specimens[0]);
    }
  }, [specimens, reset]);

  async function handleSpecimenRecording(data) {
    const request = {
      ...auth,
      ...data,
      record_id: record.record_id,
    };
    try {
      await newSpecimen(request).unwrap();
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
        title="Specimen collection"
        description="Manage and update specimen collections"
        renderIcon={<PillsAdd size={42} />}
      />
      <Spacer h={7} />

      {fetchingSpecimens ? (
        <Loading />
      ) : (
        <Fragment>
          <Stack orientation="horizontal" gap={10}>
            <div>
              <FormLabel>ID</FormLabel>
              <p>{record?.record_id}</p>
            </div>
            <div>
              <FormLabel>Patient's name</FormLabel>
              <p>{record?.records_name}</p>
            </div>
          </Stack>
          <Spacer h={7} />
          <Form onSubmit={handleSubmit(handleSpecimenRecording)}>
            <Stack gap={7}>
              <FormGroup legendText="Collection 1">
                <Stack gap={7}>
                  <DatePicker datePickerType="single">
                    <DatePickerInput
                      placeholder="mm/dd/yyyy"
                      labelText="Date"
                      id="specimen_collection_1_date"
                      {...register("specimen_collection_1_date")}
                      defaultValue={new Date()}
                      invalid={errors.specimen_collection_1_date ? true : false}
                      invalidText={errors.specimen_collection_1_date?.message}
                    />
                  </DatePicker>

                  <FormGroup legendText="Specimen type">
                    <Stack gap={7}>
                      <RadioButtonGroup
                        orientation="vertical"
                        legendText="Type"
                        name="specimen_collection_1_specimen_collection_type"
                        defaultSelected={
                          specimens[0]
                            ?.specimen_collection_1_specimen_collection_type ||
                          "sputum"
                        }
                        onChange={(evt) =>
                          setValue(
                            "specimen_collection_1_specimen_collection_type",
                            evt
                          )
                        }
                      >
                        <RadioButton
                          labelText="sputum"
                          value="sputum"
                          id="sputum"
                        />
                        <RadioButton labelText="CSF" value="csf" id="csf" />
                        <RadioButton
                          labelText="Lymph node aspirate"
                          value="lymph_node_aspirate"
                          id="lymph_node_aspirate"
                        />
                        <RadioButton
                          labelText="Gastric aspirate"
                          value="gastric_aspirate"
                          id="gastric_aspirate"
                        />
                        <RadioButton
                          labelText="Urine"
                          value="urine"
                          id="urine"
                        />
                        <RadioButton
                          labelText="other"
                          value="other"
                          id="other"
                        />
                      </RadioButtonGroup>

                      <TextInput
                        id="specimen_collection_1_other"
                        labelText="Enter other"
                        {...register("specimen_collection_1_other")}
                        invalid={
                          errors.specimen_collection_1_other ? true : false
                        }
                        invalidText={
                          errors.specimen_collection_1_other?.message
                        }
                      />

                      <RadioButtonGroup
                        legendText="Period"
                        name="specimen_collection_1_period"
                        defaultSelected={
                          specimens[0]?.specimen_collection_1_period || "spot"
                        }
                        onChange={(evt) =>
                          setValue("specimen_collection_1_period", evt)
                        }
                      >
                        <RadioButton labelText="Spot" value="spot" id="spot" />
                        <RadioButton
                          labelText="Morning"
                          value="morning"
                          id="morning"
                        />
                        <RadioButton labelText="N/A" value="n_a" id="n_a" />
                      </RadioButtonGroup>

                      <RadioButtonGroup
                        orientation="vertical"
                        legendText="Aspect"
                        name="specimen_collection_1_aspect"
                        defaultSelected={
                          specimens[0]?.specimen_collection_1_aspect ||
                          "mucopurulent"
                        }
                        onChange={(evt) =>
                          setValue("specimen_collection_1_aspect", evt)
                        }
                      >
                        <RadioButton
                          labelText="Mucopurulent"
                          value="mucopurulent"
                          id="mucopurulent"
                        />
                        <RadioButton
                          labelText="Bloody"
                          value="bloody"
                          id="bloody"
                        />
                        <RadioButton
                          labelText="Salivary"
                          value="salivary"
                          id="salivary"
                        />
                        <RadioButton labelText="N/A" value="n_a" id="n_a2" />
                      </RadioButtonGroup>
                    </Stack>
                  </FormGroup>

                  <TextInput
                    id="specimen_collection_1_received_by"
                    labelText="Received by"
                    {...register("specimen_collection_1_received_by")}
                    invalid={
                      errors.specimen_collection_1_received_by ? true : false
                    }
                    invalidText={
                      errors.specimen_collection_1_received_by?.message
                    }
                  />
                </Stack>
              </FormGroup>

              <FormGroup legendText="Collection 2">
                <Stack gap={7}>
                  <DatePicker datePickerType="single">
                    <DatePickerInput
                      placeholder="mm/dd/yyyy"
                      labelText="Date"
                      id="specimen_collection_2_date"
                      {...register("specimen_collection_2_date")}
                      defaultValue={new Date()}
                      invalid={errors.specimen_collection_2_date ? true : false}
                      invalidText={errors.specimen_collection_2_date?.message}
                    />
                  </DatePicker>

                  <FormGroup legendText="Specimen type">
                    <Stack gap={7}>
                      <RadioButtonGroup
                        orientation="vertical"
                        legendText="Type"
                        name="specimen_collection_2_specimen_collection_type"
                        defaultSelected={
                          specimens[0]
                            ?.specimen_collection_2_specimen_collection_type ||
                          "sputum2"
                        }
                        onChange={(evt) =>
                          setValue(
                            "specimen_collection_2_specimen_collection_type",
                            evt
                          )
                        }
                      >
                        <RadioButton
                          labelText="sputum"
                          value="sputum"
                          id="sputum2"
                        />
                        <RadioButton labelText="CSF" value="csf" id="csf2" />
                        <RadioButton
                          labelText="Lymph node aspirate"
                          value="lymph_node_aspirate"
                          id="lymph_node_aspirate2"
                        />
                        <RadioButton
                          labelText="Gastric aspirate"
                          value="gastric_aspirate"
                          id="gastric_aspirate2"
                        />
                        <RadioButton
                          labelText="Urine"
                          value="urine"
                          id="urine2"
                        />
                        <RadioButton
                          labelText="other"
                          value="other"
                          id="other2"
                        />
                      </RadioButtonGroup>

                      <TextInput
                        id="specimen_collection_2_other"
                        labelText="Enter other"
                        {...register("specimen_collection_2_other")}
                        invalid={
                          errors.specimen_collection_2_other ? true : false
                        }
                        invalidText={
                          errors.specimen_collection_2_other?.message
                        }
                      />

                      <RadioButtonGroup
                        legendText="Period"
                        name="specimen_collection_2_period"
                        defaultSelected={
                          specimens[0]?.specimen_collection_2_period || "spot2"
                        }
                        onChange={(evt) =>
                          setValue("specimen_collection_2_period", evt)
                        }
                      >
                        <RadioButton labelText="Spot" value="spot" id="spot2" />
                        <RadioButton
                          labelText="Morning"
                          value="morning"
                          id="morning2"
                        />
                        <RadioButton labelText="N/A" value="n_a" id="n_a3" />
                      </RadioButtonGroup>

                      <RadioButtonGroup
                        orientation="vertical"
                        legendText="Aspect"
                        name="specimen_collection_2_aspect"
                        defaultSelected={
                          specimens[0]?.specimen_collection_2_aspect ||
                          "mucopurulent2"
                        }
                        onChange={(evt) =>
                          setValue("specimen_collection_2_aspect", evt)
                        }
                      >
                        <RadioButton
                          labelText="Mucopurulent"
                          value="mucopurulent"
                          id="mucopurulent"
                        />
                        <RadioButton
                          labelText="Bloody"
                          value="bloody"
                          id="bloody2"
                        />
                        <RadioButton
                          labelText="Salivary"
                          value="salivary"
                          id="salivary2"
                        />
                        <RadioButton labelText="N/A" value="n_a" id="n_a4" />
                      </RadioButtonGroup>
                    </Stack>
                  </FormGroup>

                  <TextInput
                    id="specimen_collection_2_received_by"
                    labelText="Received by"
                    {...register("specimen_collection_2_received_by")}
                    invalid={
                      errors.specimen_collection_2_received_by ? true : false
                    }
                    invalidText={
                      errors.specimen_collection_2_received_by?.message
                    }
                  />
                </Stack>
              </FormGroup>

              {!isLoading ? (
                <Button kind="primary" type="submit">
                  Save
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
        </Fragment>
      )}
    </FlexGrid>
  );
};

export default SpecimenCollection;
