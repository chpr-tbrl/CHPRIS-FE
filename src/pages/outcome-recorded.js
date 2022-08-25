import React, { useEffect, Fragment } from "react";
import { PageHeader, Spacer, TabBar } from "components";
import {
  Stack,
  Form,
  Button,
  Column,
  Loading,
  TextInput,
  RadioButton,
  FormLabel,
  RadioButtonGroup,
  Accordion,
  AccordionItem,
  InlineLoading,
  TextArea,
  FlexGrid,
  ActionableNotification,
} from "@carbon/react";
import { DocumentAdd } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OUTCOME_RECORDED_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import {
  useGetOutcomesQuery,
  useNewOutcomeMutation,
  useGetLabResultsQuery,
  useUpdateOutcomeMutation,
} from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deNormalizeData, normalizeData } from "utils";

const OutcomeRecorded = () => {
  const navigate = useNavigate();
  const record = useSelector(recordSelector);
  const [newOutcome, { isLoading: isCreating }] = useNewOutcomeMutation();
  const [updateOutcome, { isLoading: isUpdating }] = useUpdateOutcomeMutation();
  const {
    data: outcomes = [],
    isFetching,
    isError,
    refetch,
  } = useGetOutcomesQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: results = [],
    isFetching: fetchingResults,
    refetch: refetchResults,
  } = useGetLabResultsQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  const isUpdate = outcomes[0]?.outcome_recorded_id ? true : false;

  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: OUTCOME_RECORDED_SCHEMA.cast(),
    resolver: yupResolver(OUTCOME_RECORDED_SCHEMA),
  });

  const status = watch(
    "outcome_recorded_started_tb_treatment_outcome",
    "started_tb_treatment"
  );

  useEffect(() => {
    if (outcomes.length) {
      const data = deNormalizeData(outcomes[0]);
      reset(data);
    }
  }, [outcomes, reset]);

  useEffect(() => {
    Array.prototype.forEach.call(
      document.querySelectorAll("input[type=text],textarea"),
      function (input) {
        input.addEventListener("input", function () {
          input.value = input.value.toUpperCase();
        });
      }
    );
  });

  async function handleOutcome(data) {
    const request = {
      ...data,
      record_id: record.record_id,
    };
    try {
      await newOutcome(request).unwrap();
      toast.success("Outcome recorded");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handleOutcomeUpdate(data) {
    // Re normalize the data before submission
    const normalizedData = normalizeData(data);

    try {
      await updateOutcome(normalizedData).unwrap();
      toast.success("Outcome recorded");
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isFetching || fetchingResults) return <Loading />;

  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        <TabBar />
        <PageHeader
          title="Outcome recorded"
          description="Manage and update outcome recorded"
          renderIcon={<DocumentAdd size={42} />}
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
        {isError && (
          <Fragment>
            <ActionableNotification
              inline
              kind="error"
              title="An error occured"
              subtitle="while fetching outcome recorded"
              lowContrast
              hideCloseButton
              actionButtonLabel="try again"
              onActionButtonClick={refetch}
            />
            <Spacer h={7} />
          </Fragment>
        )}
        <Form
          onSubmit={
            isUpdate
              ? handleSubmit(handleOutcomeUpdate)
              : handleSubmit(handleOutcome)
          }
          className="data--collection"
        >
          <Stack gap={7}>
            <Accordion>
              <AccordionItem
                title={
                  <span className="accordion--title">View lab results</span>
                }
              >
                <Stack gap={5}>
                  <h5>SMR results</h5>
                  <p>
                    <span>Result 1: </span>
                    {results[0]?.lab_smear_microscopy_result_result_1 || "N/A"}
                  </p>
                  <p>
                    <span>Result 2: </span>
                    {results[0]?.lab_smear_microscopy_result_result_1 || "N/A"}
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
                    {results[0]?.lab_xpert_mtb_rif_assay_rif_result_2 || "N/A"}
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

            <RadioButtonGroup
              orientation="vertical"
              legendText="Treatment"
              name="outcome_recorded_started_tb_treatment_outcome"
              valueSelected={watch(
                "outcome_recorded_started_tb_treatment_outcome"
              )}
              onChange={(evt) => {
                if (evt !== "started_tb_treatment") {
                  setValue("outcome_recorded_tb_rx_number", "");
                }
                setValue("outcome_recorded_started_tb_treatment_outcome", evt, {
                  shouldValidate: true,
                });
              }}
            >
              <RadioButton
                labelText="Started TB treatment"
                value="started_tb_treatment"
                id="started_tb_treatment"
              />
              <RadioButton
                labelText="Referred for treatment"
                value="referred_for_treatment"
                id="referred_for_treatment"
              />
              <RadioButton labelText="other" value="other" id="other" />
            </RadioButtonGroup>

            {status === "started_tb_treatment" && (
              <TextInput
                id="outcome_recorded_tb_rx_number"
                labelText="TB Rx number"
                {...register("outcome_recorded_tb_rx_number")}
                invalid={errors.outcome_recorded_tb_rx_number ? true : false}
                invalidText={errors.outcome_recorded_tb_rx_number?.message}
              />
            )}

            {status === "other" && (
              <TextInput
                id="outcome_recorded_other"
                labelText="Other"
                {...register("outcome_recorded_other")}
                invalid={errors.outcome_recorded_other ? true : false}
                invalidText={errors.outcome_recorded_other?.message}
              />
            )}

            <TextArea
              labelText="Comments"
              rows={4}
              id="outcome_recorded_comments"
              {...register("outcome_recorded_comments")}
              invalid={errors.outcome_recorded_comments ? true : false}
              invalidText={errors.outcome_recorded_comments?.message}
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

export default OutcomeRecorded;
