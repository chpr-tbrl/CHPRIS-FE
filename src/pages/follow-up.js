import React, { useEffect } from "react";
import { PageHeader, Spacer, TabBar, DatePicker } from "components";
import {
  Stack,
  Form,
  Button,
  Column,
  FlexGrid,
  Loading,
  FormGroup,
  TextInput,
  Checkbox,
  Accordion,
  AccordionItem,
  InlineLoading,
  FormLabel,
  TextArea,
} from "@carbon/react";
import { ReminderMedical } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FOLLOW_UP_SCHEMA } from "schemas";
import { recordSelector } from "features";
import { useSelector } from "react-redux";
import {
  useGetFollowUpsQuery,
  useNewFollowUpMutation,
  useUpdateFollowUpMutation,
} from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FollowUP = () => {
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const [newFollowUp, { isLoading: isCreating }] = useNewFollowUpMutation();
  const [updateFollowUp, { isLoading: isUpdating }] =
    useUpdateFollowUpMutation();
  const {
    data: followUps = [],
    isFetching,
    refetch,
  } = useGetFollowUpsQuery(record.record_id);

  const isUpdate = followUps[0]?.follow_up_id ? true : false;

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FOLLOW_UP_SCHEMA),
  });

  useEffect(() => {
    if (followUps.length) {
      reset(followUps[0]);
    }
  }, [followUps, reset]);

  async function handleFollowUpCreation(data) {
    const request = {
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

  async function handleFollowUpdate(data) {
    try {
      await updateFollowUp(data).unwrap();
      toast.success("Follow up updated");
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isFetching) return <Loading />;

  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
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
        <Form
          onSubmit={
            isUpdate
              ? handleSubmit(handleFollowUpdate)
              : handleSubmit(handleFollowUpCreation)
          }
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

            <DatePicker
              control={control}
              labelText="Date"
              id="follow_up_schedule_date"
              invalid={errors.follow_up_schedule_date ? true : false}
              invalidText={errors.follow_up_schedule_date?.message}
            />

            <TextArea
              labelText="Comments"
              rows={4}
              id="follow_up_comments"
              {...register("follow_up_comments")}
              invalid={errors.follow_up_comments ? true : false}
              invalidText={errors.follow_up_comments?.message}
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

export default FollowUP;
