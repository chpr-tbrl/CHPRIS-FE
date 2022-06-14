import React, { useEffect } from "react";
import { PageHeader, Spacer, TabBar } from "components";
import {
  Stack,
  Form,
  Button,
  Column,
  Loading,
  FlexGrid,
  FormGroup,
  FormLabel,
  TextInput,
  RadioButton,
  RadioButtonGroup,
  DatePicker,
  InlineLoading,
  DatePickerInput,
} from "@carbon/react";
import { Hospital } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LAB_RESULTS_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import { useNewLabResultMutation, useGetLabResultsQuery } from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LabResults = () => {
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const [newLabResult, { isLoading }] = useNewLabResultMutation();
  const { data: results = [], isLoading: fetchingResults } =
    useGetLabResultsQuery(record.record_id);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LAB_RESULTS_SCHEMA),
  });

  useEffect(() => {
    if (results.length) {
      reset(results[0]);
    }
  }, [results, reset]);

  async function handleResultRecording(data) {
    const request = {
      ...data,
      record_id: record.record_id,
    };
    try {
      await newLabResult(request).unwrap();
      toast.success("Lab result recorded");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (fetchingResults) return <Loading />;

  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        <TabBar />
        <PageHeader
          title="Lab Results"
          description="Manage and update lab results"
          renderIcon={<Hospital size={42} />}
        />
        <Spacer h={7} />
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
        <Form onSubmit={handleSubmit(handleResultRecording)}>
          <Stack gap={7}>
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
                  defaultSelected={
                    results[0]?.lab_smear_microscopy_result_result_1 ||
                    "not_done"
                  }
                  onChange={(evt) =>
                    setValue("lab_smear_microscopy_result_result_1", evt)
                  }
                >
                  <RadioButton labelText="No AFB seen" value="no_afb_seen" />
                  <RadioButton labelText="Scanty" value="scanty" />
                  <RadioButton labelText="1+" value="1+" />
                  <RadioButton labelText="2+" value="2+" />
                  <RadioButton labelText="3+" value="3+" />
                  <RadioButton
                    labelText="TB LAMP - Positive"
                    value="tb_lamp_positive"
                  />
                  <RadioButton
                    labelText="TB LAMP - Negative"
                    value="tb_lamp_negative"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Result 2"
                  name="lab_smear_microscopy_result_result_2"
                  defaultSelected={
                    results[0]?.lab_smear_microscopy_result_result_2 ||
                    "not_done"
                  }
                  onChange={(evt) =>
                    setValue("lab_smear_microscopy_result_result_2", evt)
                  }
                >
                  <RadioButton labelText="No AFB seen" value="no_afb_seen" />
                  <RadioButton labelText="Scanty" value="scanty" id="scanty" />
                  <RadioButton labelText="1+" value="1+" id="1+" />
                  <RadioButton labelText="2+" value="2+" id="2+" />
                  <RadioButton labelText="3+" value="3+" id="3+" />
                  <RadioButton
                    labelText="TB LAMP - Positive"
                    value="tb_lamp_positive"
                  />
                  <RadioButton
                    labelText="TB LAMP - Negative"
                    value="tb_lamp_negative"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
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
                    invalidText={
                      errors.lab_smear_microscopy_result_date?.message
                    }
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
                  defaultSelected={
                    results[0]?.lab_xpert_mtb_rif_assay_result || "not_done"
                  }
                  onChange={(evt) =>
                    setValue("lab_xpert_mtb_rif_assay_result", evt)
                  }
                >
                  <RadioButton labelText="Detected" value="detected" />
                  <RadioButton labelText="Trace" value="trace" id="trace" />
                  <RadioButton labelText="Not detected" value="not_detected" />
                  <RadioButton
                    labelText="Error/invalid"
                    value="error_invalid"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Grades"
                  name="lab_xpert_mtb_rif_assay_grades"
                  defaultSelected={
                    results[0]?.lab_xpert_mtb_rif_assay_grades || "very_low"
                  }
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
                  defaultSelected={
                    results[0]?.lab_xpert_mtb_rif_assay_rif_result || "not_done"
                  }
                  onChange={(evt) =>
                    setValue("lab_xpert_mtb_rif_assay_rif_result", evt)
                  }
                >
                  <RadioButton labelText="Detected" value="detected" />
                  <RadioButton
                    labelText="Indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not detected" value="not_detected" />
                  <RadioButton labelText="Not done" value="not_done" />
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
                  invalid={
                    errors.lab_xpert_mtb_rif_assay_done_by ? true : false
                  }
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
                  defaultSelected={
                    results[0]?.lab_urine_lf_lam_result || "not_done"
                  }
                  onChange={(evt) => setValue("lab_urine_lf_lam_result", evt)}
                >
                  <RadioButton labelText="Negative" value="negative" />
                  <RadioButton labelText="Positive" value="positive" />
                  <RadioButton
                    labelText="Error/invalid"
                    value="error_invalid"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
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

            {!isLoading ? (
              <Button kind="primary" type="submit">
                Save
              </Button>
            ) : (
              <InlineLoading
                status="active"
                iconDescription="Active loading indicator"
                description="processing ..."
              />
            )}
          </Stack>
        </Form>
      </Column>
    </FlexGrid>
  );
};

export default LabResults;
