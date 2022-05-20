import React from "react";
import { PageHeader, Spacer, TabBar } from "components";
import {
  Stack,
  Form,
  Button,
  FlexGrid,
  FormGroup,
  TextInput,
  Checkbox,
  Accordion,
  AccordionItem,
  DatePicker,
  DatePickerInput,
  InlineLoading,
  FormLabel,
  TextArea,
} from "@carbon/react";
import { ReminderMedical } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FOLLOW_UP_SCHEMA } from "schemas";
import { recordSelector, authSelector } from "features";
import { useSelector } from "react-redux";
import { useNewFollowUpMutation } from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FollowUP = () => {
  const record = useSelector(recordSelector);
  const auth = useSelector(authSelector);
  const navigate = useNavigate();
  const [newFollowUp, { isLoading }] = useNewFollowUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FOLLOW_UP_SCHEMA),
  });

  async function handleFollowUpRecording(data) {
    const request = {
      ...auth,
      ...data,
      record_id: record.record_id,
    };
    try {
      await newFollowUp(request).unwrap();
      toast.success("Follow up recorded");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  return (
    <FlexGrid fullWidth className="page">
      <TabBar />
      <PageHeader
        title="Follow Up"
        description="Manage and update client follow up"
        renderIcon={<ReminderMedical size={42} />}
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
      <Form onSubmit={handleSubmit(handleFollowUpRecording)}>
        <Stack gap={7}>
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
    </FlexGrid>
  );
};

export default FollowUP;
