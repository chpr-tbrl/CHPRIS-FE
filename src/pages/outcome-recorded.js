import React from "react";
import { PageHeader } from "components";
import {
  Stack,
  Form,
  Button,
  TextInput,
  RadioButton,
  FormLabel,
  RadioButtonGroup,
  Accordion,
  AccordionItem,
  TextArea,
} from "@carbon/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OUTCOME_RECORDED_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import TabBar from "components/TabBar";

const OutcomeRecorded = () => {
  const record = useSelector(recordSelector);
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OUTCOME_RECORDED_SCHEMA),
  });

  const treatmentStatus =
    watch(
      "outcome_recorded_started_tb_treatment_outcome",
      "started_tb_treatment"
    ) === "started_tb_treatment";

  async function handleOutcome(data) {
    alert("form sumbitted check console for output");
    console.log("form data: ", data);
  }

  return (
    <div className="page">
      <TabBar />
      <PageHeader
        title="Outcome recorded"
        description="Manage and update outcome recorded"
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

      <Form onSubmit={handleSubmit(handleOutcome)}>
        <Stack gap={7}>
          <br />
          <Accordion>
            <AccordionItem
              title={<span className="accordion--title">View lab results</span>}
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

          {!treatmentStatus && (
            <TextInput
              id="outcome_recorded_tb_rx_number"
              labelText="TB Rx number"
              {...register("outcome_recorded_tb_rx_number")}
              invalid={errors.outcome_recorded_tb_rx_number ? true : false}
              invalidText={errors.outcome_recorded_tb_rx_number?.message}
            />
          )}

          <TextInput
            id="outcome_recorded_other"
            labelText="Other"
            {...register("outcome_recorded_other")}
            invalid={errors.outcome_recorded_other ? true : false}
            invalidText={errors.outcome_recorded_other?.message}
          />

          <TextArea
            labelText="Comments"
            rows={4}
            id="outcome_recorded_comments"
            invalid={errors.outcome_recorded_comments ? true : false}
            invalidText={errors.outcome_recorded_comments?.message}
          />

          <Button kind="primary" type="submit">
            Save
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default OutcomeRecorded;
