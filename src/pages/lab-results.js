import React from "react";
import { PageHeader, TabBar } from "components";
import {
  Stack,
  Form,
  Button,
  FormGroup,
  FormLabel,
  TextInput,
  RadioButton,
  RadioButtonGroup,
  DatePicker,
  DatePickerInput,
} from "@carbon/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LAB_RESULTS_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";

const LabResults = () => {
  const record = useSelector(recordSelector);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LAB_RESULTS_SCHEMA),
  });

  async function handleResultRecording(data) {
    alert("form sumbitted check console for output");
    console.log("form data: ", data);
  }

  return (
    <div className="page">
      <TabBar />
      <PageHeader
        title="Lab Results"
        description="Manage and update lab results"
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
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Specimen received"
              id="lab_date_specimen_collection_received"
              {...register("lab_date_specimen_collection_received")}
              defaultValue={new Date()}
              invalid={
                errors.lab_date_specimen_collection_received ? true : false
              }
              invalidText={
                errors.lab_date_specimen_collection_received?.message
              }
            />
          </DatePicker>

          <TextInput
            id="lab_received_by"
            labelText="Received by"
            {...register("lab_received_by")}
            invalid={errors.lab_received_by ? true : false}
            invalidText={errors.lab_received_by?.message}
          />

          <TextInput
            id="lab_registration_number"
            labelText="Lab registration number"
            {...register("lab_registration_number")}
            invalid={errors.lab_registration_number ? true : false}
            invalidText={errors.lab_registration_number?.message}
          />

          <FormGroup legendText="Smear microscopy result">
            <Stack gap={7}>
              <RadioButtonGroup
                orientation="vertical"
                legendText="Result 1"
                name="lab_smear_microscopy_result_result_1"
                defaultSelected="not_done"
                onChange={(evt) =>
                  setValue("lab_smear_microscopy_result_result_1", evt)
                }
              >
                <RadioButton
                  labelText="No AFB seen"
                  value="no_afb_seen"
                  id="no_afb_seen"
                />
                <RadioButton labelText="Scanty" value="scanty" id="scanty" />
                <RadioButton labelText="1+" value="1+" id="1+" />
                <RadioButton labelText="2+" value="2+" id="2+" />
                <RadioButton labelText="3+" value="3+" id="3+" />
                <RadioButton
                  labelText="TB LAMP - Positive"
                  value="tb_lamp_positive"
                  id="tb_lamp_positive"
                />
                <RadioButton
                  labelText="TB LAMP - Negative"
                  value="tb_lamp_negative"
                  id="tb_lamp_negative"
                />
                <RadioButton
                  labelText="Not done"
                  value="not_done"
                  id="not_done"
                />
              </RadioButtonGroup>

              <RadioButtonGroup
                orientation="vertical"
                legendText="Result 2"
                name="lab_smear_microscopy_result_result_2"
                defaultSelected="not_done"
                onChange={(evt) =>
                  setValue("lab_smear_microscopy_result_result_2", evt)
                }
              >
                <RadioButton
                  labelText="No AFB seen"
                  value="no_afb_seen"
                  id="no_afb_seen"
                />
                <RadioButton labelText="Scanty" value="scanty" id="scanty" />
                <RadioButton labelText="1+" value="1+" id="1+" />
                <RadioButton labelText="2+" value="2+" id="2+" />
                <RadioButton labelText="3+" value="3+" id="3+" />
                <RadioButton
                  labelText="TB LAMP - Positive"
                  value="tb_lamp_positive"
                  id="tb_lamp_positive"
                />
                <RadioButton
                  labelText="TB LAMP - Negative"
                  value="tb_lamp_negative"
                  id="tb_lamp_negative"
                />
                <RadioButton
                  labelText="Not done"
                  value="not_done"
                  id="not_done"
                />
              </RadioButtonGroup>

              <DatePicker datePickerType="single">
                <DatePickerInput
                  placeholder="mm/dd/yyyy"
                  labelText="Date"
                  id="lab_smear_microscopy_result_date"
                  {...register("lab_smear_microscopy_result_date")}
                  defaultValue={new Date()}
                  invalid={
                    errors.lab_smear_microscopy_result_date ? true : false
                  }
                  invalidText={errors.lab_smear_microscopy_result_date?.message}
                />
              </DatePicker>

              <TextInput
                id="lab_smear_microscopy_result_done_by"
                labelText="Done by"
                {...register("lab_smear_microscopy_result_done_by")}
                invalid={
                  errors.lab_smear_microscopy_result_done_by ? true : false
                }
                invalidText={
                  errors.lab_smear_microscopy_result_done_by?.message
                }
              />
            </Stack>
          </FormGroup>

          <FormGroup legendText="Xpert MTB/RIF assay">
            <Stack gap={7}>
              <RadioButtonGroup
                orientation="vertical"
                legendText="MTB result"
                name="lab_xpert_mtb_rif_assay_result"
                defaultSelected="not_done"
                onChange={(evt) =>
                  setValue("lab_xpert_mtb_rif_assay_result", evt)
                }
              >
                <RadioButton
                  labelText="Detected"
                  value="detected"
                  id="detected"
                />
                <RadioButton labelText="Trace" value="trace" id="trace" />
                <RadioButton
                  labelText="Not detected"
                  value="not_detected"
                  id="not_detected"
                />
                <RadioButton
                  labelText="Error/invalid"
                  value="error_invalid"
                  id="error_invalid"
                />
                <RadioButton
                  labelText="Not done"
                  value="not_done"
                  id="not_done"
                />
              </RadioButtonGroup>

              <RadioButtonGroup
                orientation="vertical"
                legendText="Grades"
                name="lab_xpert_mtb_rif_assay_grades"
                defaultSelected="very_low"
                onChange={(evt) =>
                  setValue("lab_xpert_mtb_rif_assay_grades", evt)
                }
              >
                <RadioButton labelText="High" value="high" id="high" />
                <RadioButton labelText="Medium" value="medium" id="medium" />
                <RadioButton labelText="Low" value="low" id="low" />
                <RadioButton
                  labelText="Very low"
                  value="very_low"
                  id="very_low"
                />
              </RadioButtonGroup>

              <RadioButtonGroup
                orientation="vertical"
                legendText="RIF result"
                name="lab_xpert_mtb_rif_assay_rif_result"
                defaultSelected="not_done"
                onChange={(evt) =>
                  setValue("lab_xpert_mtb_rif_assay_rif_result", evt)
                }
              >
                <RadioButton
                  labelText="Detected"
                  value="detected"
                  id="detected"
                />
                <RadioButton
                  labelText="Indeterminate"
                  value="indeterminate"
                  id="indeterminate"
                />
                <RadioButton
                  labelText="Not detected"
                  value="not_detected"
                  id="not_detected"
                />
                <RadioButton
                  labelText="Not done"
                  value="not_done"
                  id="not_done"
                />
              </RadioButtonGroup>

              <DatePicker datePickerType="single">
                <DatePickerInput
                  placeholder="mm/dd/yyyy"
                  labelText="Date"
                  id="lab_xpert_mtb_rif_assay_date"
                  {...register("lab_xpert_mtb_rif_assay_date")}
                  defaultValue={new Date()}
                  invalid={errors.lab_xpert_mtb_rif_assay_date ? true : false}
                  invalidText={errors.lab_xpert_mtb_rif_assay_date?.message}
                />
              </DatePicker>

              <TextInput
                id="lab_xpert_mtb_rif_assay_done_by"
                labelText="Done by"
                {...register("lab_xpert_mtb_rif_assay_done_by")}
                invalid={errors.lab_xpert_mtb_rif_assay_done_by ? true : false}
                invalidText={errors.lab_xpert_mtb_rif_assay_done_by?.message}
              />
            </Stack>
          </FormGroup>

          <FormGroup legendText="Urine LF-LAM">
            <Stack gap={7}>
              <RadioButtonGroup
                orientation="vertical"
                legendText=""
                name="lab_urine_lf_lam_result"
                defaultSelected="not_done"
                onChange={(evt) => setValue("lab_urine_lf_lam_result", evt)}
              >
                <RadioButton
                  labelText="Negative"
                  value="negative"
                  id="negative"
                />
                <RadioButton
                  labelText="Positive"
                  value="positive"
                  id="positive"
                />
                <RadioButton
                  labelText="Error/invalid"
                  value="error_invalid"
                  id="error_invalid"
                />
                <RadioButton
                  labelText="Not done"
                  value="not_done"
                  id="not_done"
                />
              </RadioButtonGroup>

              <DatePicker datePickerType="single">
                <DatePickerInput
                  placeholder="mm/dd/yyyy"
                  labelText="Date"
                  id="lab_urine_lf_lam_date"
                  {...register("lab_urine_lf_lam_date")}
                  defaultValue={new Date()}
                  invalid={errors.lab_urine_lf_lam_date ? true : false}
                  invalidText={errors.lab_urine_lf_lam_date?.message}
                />
              </DatePicker>

              <TextInput
                id="lab_urine_lf_lam_done_by"
                labelText="Done by"
                {...register("lab_urine_lf_lam_done_by")}
                invalid={errors.lab_urine_lf_lam_done_by ? true : false}
                invalidText={errors.lab_urine_lf_lam_done_by?.message}
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

export default LabResults;
