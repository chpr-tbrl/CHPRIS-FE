import React, { useEffect } from "react";
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
} from "@carbon/react";
import { DocumentAdd } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OUTCOME_RECORDED_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import { useNewOutcomeMutation, useGetOutcomesQuery } from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OutcomeRecorded = () => {
  const navigate = useNavigate();
  const record = useSelector(recordSelector);
  const [newOutcome, { isLoading }] = useNewOutcomeMutation();
  const { data: outcomes = [], isLoading: fetchingOutcomes } =
    useGetOutcomesQuery(record.record_id);

  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OUTCOME_RECORDED_SCHEMA),
  });

  const status = watch(
    "outcome_recorded_started_tb_treatment_outcome",
    "started_tb_treatment"
  );

  useEffect(() => {
    if (outcomes.length) {
      reset(outcomes[0]);
    }
  }, [outcomes, reset]);

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

  if (fetchingOutcomes) return <Loading />;

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
        <Form onSubmit={handleSubmit(handleOutcome)}>
          <Stack gap={7}>
            <Accordion>
              <AccordionItem
                title={
                  <span className="accordion--title">View lab results</span>
                }
              >
                <Stack gap={5}>
                  <h5>SMR results</h5>
                  <p>Result 1: Not done</p>
                  <p>Result 2: Not done</p>
                  <h5>Xpert results</h5>
                  <p>MTB: Detected</p>
                  <p>Grade: Very Low</p>
                  <p>RIF: Not done</p>

                  <h5>Urine results</h5>
                  <p>Result: Not done</p>
                </Stack>
              </AccordionItem>
            </Accordion>

            <RadioButtonGroup
              orientation="vertical"
              legendText="Treatment"
              name="outcome_recorded_started_tb_treatment_outcome"
              defaultSelected="started_tb_treatment"
              onChange={(evt) =>
                setValue("outcome_recorded_started_tb_treatment_outcome", evt, {
                  shouldValidate: true,
                })
              }
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

export default OutcomeRecorded;
