import React, { useEffect } from "react";
import toast from "react-hot-toast";
import {
  Stack,
  Form,
  Button,
  Column,
  Loading,
  FlexGrid,
  Checkbox,
  Accordion,
  AccordionItem,
  RadioButton,
  RadioButtonGroup,
  InlineLoading,
  FormLabel,
  TextArea,
} from "@carbon/react";
import { Archive } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageHeader, Spacer, TabBar } from "components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TB_TREATMENT_OUTCOME_SCHEMA } from "schemas";
import { recordSelector } from "features";
import {
  useGetOutcomesQuery,
  useGetFollowUpsQuery,
  useGetLabResultsQuery,
  useGetTreatmentOutcomesQuery,
  useNewTreatmentOutcomeMutation,
  useUpdateTreatmentOutcomeMutation,
} from "services";

const TBTreatmentOutcome = () => {
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const [newTreatmentOutcome, { isLoading: isCreating }] =
    useNewTreatmentOutcomeMutation();
  const [updateTreatmentOutcome, { isLoading: isUpdating }] =
    useUpdateTreatmentOutcomeMutation();
  const {
    data: treatmentOutcomes = [],
    isFetching,
    refetch,
  } = useGetTreatmentOutcomesQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: results = [],
    isFetching: fetchingResults,
    refetch: refetchResults,
  } = useGetLabResultsQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: followUp = [],
    isFetching: fetchingFollowUp,
    refetch: refetchFollowUp,
  } = useGetFollowUpsQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: outcome = [],
    isFetching: fetchingOutcome,
    refetch: refetchOutcome,
  } = useGetOutcomesQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  const isUpdate = treatmentOutcomes[0]?.tb_treatment_outcome_id ? true : false;

  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TB_TREATMENT_OUTCOME_SCHEMA),
    defaultValues: TB_TREATMENT_OUTCOME_SCHEMA.cast(),
  });

  useEffect(() => {
    if (treatmentOutcomes.length) {
      reset(treatmentOutcomes[0]);
    }
  }, [treatmentOutcomes, reset]);

  async function handleTreatmentOutcome(data) {
    const request = {
      ...data,
      record_id: record.record_id,
    };
    try {
      await newTreatmentOutcome(request).unwrap();
      toast.success("Treatment outcome recorded");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handleUpdate(data) {
    try {
      await updateTreatmentOutcome(data).unwrap();
      toast.success("Treatment outcome updated");
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isFetching || fetchingResults || fetchingFollowUp || fetchingOutcome)
    return <Loading />;
  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 12, offset: 2 }}>
        <TabBar />
        <PageHeader
          title="TB treatment outcome"
          description="Manage and update Tb treatment outcome"
          renderIcon={<Archive size={42} />}
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

        <Form
          onSubmit={
            isUpdate
              ? handleSubmit(handleUpdate)
              : handleSubmit(handleTreatmentOutcome)
          }
        >
          <Stack gap={7}>
            <br />
            <div className="accordion--row">
              <Accordion>
                <AccordionItem
                  title={
                    <span className="accordion--title">View lab results</span>
                  }
                >
                  <Stack gap={4}>
                    <h5>SMR results</h5>
                    <p>
                      <span>Result 1: </span>
                      {results[0]?.lab_smear_microscopy_result_result_1 ||
                        "N/A"}
                    </p>
                    <p>
                      <span>Result 2: </span>
                      {results[0]?.lab_smear_microscopy_result_result_1 ||
                        "N/A"}
                    </p>
                    <h5>Xpert results</h5>
                    <p>
                      <span>MTB: </span>
                      {results[0]?.lab_xpert_mtb_rif_assay_result || "N/A"}
                    </p>
                    <p>
                      <span>Grade: </span>
                      {results[0]?.lab_xpert_mtb_rif_assay_grades || "N/A"}
                    </p>
                    <p>
                      <span>RIF: </span>
                      {results[0]?.lab_xpert_mtb_rif_assay_rif_result || "N/A"}
                    </p>

                    <h5>Xpert results (2)</h5>
                    <p>
                      <span>MTB: </span>
                      {results[0]?.lab_xpert_mtb_rif_assay_result_2 || "N/A"}
                    </p>
                    <p>
                      <span>Grade: </span>
                      {results[0]?.lab_xpert_mtb_rif_assay_grades_2 || "N/A"}
                    </p>
                    <p>
                      <span>RIF: </span>
                      {results[0]?.lab_xpert_mtb_rif_assay_rif_result_2 ||
                        "N/A"}
                    </p>

                    <h5>Urine results</h5>
                    <p>
                      <span>LFLam: </span>
                      {results[0]?.lab_urine_lf_lam_result || "N/A"}
                    </p>

                    <Button kind="tertiary" onClick={() => refetchResults()}>
                      refresh
                    </Button>
                  </Stack>
                </AccordionItem>
              </Accordion>
              <Accordion>
                <AccordionItem
                  title={
                    <span className="accordion--title">
                      View follow up recorded
                    </span>
                  }
                >
                  <Stack gap={4}>
                    <h5>Results</h5>
                    <p>
                      <span>Xray: </span>
                      {followUp[0]?.follow_up_xray ? "Yes" : "No"}
                    </p>
                    <p>
                      <span>Amoxicilin: </span>
                      {followUp[0]?.follow_up_amoxicillin ? "Yes" : "No"}
                    </p>
                    <h5>Other Antibiotic</h5>
                    <p>{followUp[0]?.follow_up_other_antibiotic || "N/A"}</p>
                    <h5>Follow up date</h5>
                    <p>{followUp[0]?.follow_up_date || "N/A"}</p>
                    <h5>Comments</h5>
                    <p>{followUp[0]?.follow_up_comments || "N/A"}</p>
                    <Button kind="tertiary" onClick={() => refetchFollowUp()}>
                      refresh
                    </Button>
                  </Stack>
                </AccordionItem>
              </Accordion>
              <Accordion>
                <AccordionItem
                  title={
                    <span className="accordion--title">
                      View outcome recorded
                    </span>
                  }
                >
                  <Stack gap={4}>
                    <h5>Outcome recorded</h5>
                    <p>
                      {outcome[0]
                        ?.outcome_recorded_started_tb_treatment_outcome ||
                        "N/A"}
                    </p>
                    <h5>TB RX number: </h5>
                    <p>{outcome[0]?.outcome_recorded_tb_rx_number || "N/A"}</p>
                    <h5>Comments</h5>
                    <p>{outcome[0]?.outcome_recorded_comments || "N/A"}</p>

                    <Button kind="tertiary" onClick={() => refetchOutcome()}>
                      refresh
                    </Button>
                  </Stack>
                </AccordionItem>
              </Accordion>
            </div>
            <RadioButtonGroup
              orientation="vertical"
              legendText="Treatment outcome"
              name="tb_treatment_outcome_result"
              valueSelected={watch("tb_treatment_outcome_result")}
              onChange={(evt) =>
                setValue("tb_treatment_outcome_result", evt, {
                  shouldValidate: true,
                })
              }
            >
              <RadioButton labelText="Cured" value="cured" id="cured" />
              <RadioButton
                labelText="Treatment completed"
                value="treatment_completed"
                id="treatment_completed"
              />
              <RadioButton
                labelText="Lost to follow-up"
                value="lost_to_follow_up"
                id="lost_to_follow_up"
              />
              <RadioButton labelText="Died" value="died" id="died" />
              <RadioButton
                labelText="Transferred out"
                value="transferred_out"
                id="transferred_out"
              />
            </RadioButtonGroup>

            <TextArea
              rows={4}
              labelText="Comments"
              id="tb_treatment_outcome_comments"
              {...register("tb_treatment_outcome_comments")}
              invalid={errors.tb_treatment_outcome_comments ? true : false}
              invalidText={errors.tb_treatment_outcome_comments?.message}
            />

            <Checkbox
              labelText="Close patient file"
              id="tb_treatment_outcome_close_patient_file"
              {...register("tb_treatment_outcome_close_patient_file")}
            />

            {!isCreating || isUpdating ? (
              <Button kind={isUpdate ? "secondary" : "primary"} type="submit">
                {isUpdate ? "Update" : "Save"}
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
      </Column>
    </FlexGrid>
  );
};

export default TBTreatmentOutcome;
