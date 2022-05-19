import React from "react";
import { PageHeader } from "components";
import {
  Stack,
  Form,
  Button,
  TextArea,
  Checkbox,
  FormLabel,
  Accordion,
  RadioButton,
  AccordionItem,
  RadioButtonGroup,
} from "@carbon/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TB_TREATMENT_OUTCOME_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import TabBar from "components/TabBar";

const TBTreatmentOutcome = () => {
  const record = useSelector(recordSelector);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TB_TREATMENT_OUTCOME_SCHEMA),
  });

  async function handleOutcome(data) {
    alert("form sumbitted check console for output");
    console.log("form data: ", data);
  }

  return (
    <div className="page">
      <TabBar />
      <PageHeader
        title="TB treatment outcome"
        description="Manage and update Tb treatment outcome"
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
            legendText="Treatment outcome"
            name="tb_treatment_outcome_result"
            defaultSelected="cured"
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

          <Button kind="primary" type="submit">
            Save
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default TBTreatmentOutcome;
