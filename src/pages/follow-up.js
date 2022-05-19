import React from "react";
import { PageHeader } from "components";
import {
  Stack,
  Form,
  Button,
  FormGroup,
  TextInput,
  Checkbox,
  Accordion,
  AccordionItem,
  DatePicker,
  DatePickerInput,
  FormLabel,
  TextArea,
} from "@carbon/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FOLLOW_UP_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import TabBar from "components/TabBar";

const FollowUP = () => {
  const record = useSelector(recordSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FOLLOW_UP_SCHEMA),
  });

  async function handleResultRecording(data) {
    alert("form sumbitted check console for output");
    console.log("form data: ", data);
  }

  return (
    <div className="page">
      <TabBar />
      <PageHeader
        title="Follow Up"
        description="Manage and update client follow up"
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

          <FormGroup legendText="">
            <Checkbox
              labelText="X-ray"
              id="follow_up_xray"
              {...register("follow_up_xray")}
            />
            <Checkbox
              labelText="Amoxicillin Prescribed"
              id="follow_up_amoxicillin"
              {...register("follow_up_amoxicillin")}
            />
          </FormGroup>

          <TextInput
            id="follow_up_other_antibiotic"
            labelText="Other Antiobiotics"
            {...register("follow_up_other_antibiotic")}
            invalid={errors.follow_up_other_antibiotic ? true : false}
            invalidText={errors.follow_up_other_antibiotic?.message}
          />

          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Follow up schedule date"
              id="follow_up_schedule_date"
              {...register("follow_up_schedule_date")}
              defaultValue={new Date()}
              invalid={errors.follow_up_schedule_date ? true : false}
              invalidText={errors.follow_up_schedule_date?.message}
            />
          </DatePicker>

          <TextArea
            labelText="Comments"
            rows={4}
            id="follow_up_comments"
            {...register("follow_up_comments")}
            invalid={errors.follow_up_comments ? true : false}
            invalidText={errors.follow_up_comments?.message}
          />

          <Button kind="primary" type="submit">
            Save
          </Button>
        </Stack>
      </Form>
    </div>
  );
};

export default FollowUP;
