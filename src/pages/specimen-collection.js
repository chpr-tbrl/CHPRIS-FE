import React from "react";
import { PageHeader, TabBar } from "components";
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
} from "@carbon/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SPECIMEN_COLLECTION_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";

const SpecimenCollection = () => {
  const record = useSelector(recordSelector);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SPECIMEN_COLLECTION_SCHEMA),
  });

  async function handleResultRecording(data) {
    alert("form sumbitted check console for output");
    console.log("form data: ", data);
  }

  return (
    <div className="page">
      <TabBar />
      <PageHeader
        title="Specimen collection"
        description="Manage and update specimen collections"
      />

      <Stack orientation="horizontal" gap={10}>
        <div>
          <FormLabel>ID</FormLabel>
          <p>{record?.id}</p>
        </div>
        <div>
          <FormLabel>Patient's name</FormLabel>
          <p>{record?.name}</p>
        </div>
      </Stack>
      <Form onSubmit={handleSubmit(handleResultRecording)}>
        <Stack gap={7}>
          <br />
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
                    defaultSelected="sputum"
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
                    <RadioButton labelText="Urine" value="urine" id="urine" />
                    <RadioButton labelText="other" value="other" id="other" />
                  </RadioButtonGroup>

                  <TextInput
                    id="specimen_collection_1_other"
                    labelText="Enter other"
                    {...register("specimen_collection_1_other")}
                    invalid={errors.specimen_collection_1_other ? true : false}
                    invalidText={errors.specimen_collection_1_other?.message}
                  />

                  <RadioButtonGroup
                    legendText="Period"
                    name="specimen_collection_1_period"
                    defaultSelected="spot"
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
                    defaultSelected="mucopurulent"
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
                    <RadioButton labelText="N/A" value="n_a" id="n_a" />
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
                invalidText={errors.specimen_collection_1_received_by?.message}
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
                    defaultSelected="sputum"
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
                    <RadioButton labelText="Urine" value="urine" id="urine" />
                    <RadioButton labelText="other" value="other" id="other" />
                  </RadioButtonGroup>

                  <TextInput
                    id="specimen_collection_2_other"
                    labelText="Enter other"
                    {...register("specimen_collection_2_other")}
                    invalid={errors.specimen_collection_2_other ? true : false}
                    invalidText={errors.specimen_collection_2_other?.message}
                  />

                  <RadioButtonGroup
                    legendText="Period"
                    name="specimen_collection_2_period"
                    defaultSelected="spot"
                    onChange={(evt) =>
                      setValue("specimen_collection_2_period", evt)
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
                    name="specimen_collection_2_aspect"
                    defaultSelected="mucopurulent"
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
                      id="bloody"
                    />
                    <RadioButton
                      labelText="Salivary"
                      value="salivary"
                      id="salivary"
                    />
                    <RadioButton labelText="N/A" value="n_a" id="n_a" />
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
                invalidText={errors.specimen_collection_2_received_by?.message}
              />
            </Stack>
          </FormGroup>

          <Button kind="primary" type="submit">
            Save
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default SpecimenCollection;
