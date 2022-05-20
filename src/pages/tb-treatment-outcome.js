import { PageHeader, Spacer, TabBar } from "components";
import {
  Stack,
  Form,
  Button,
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
import { TB_TREATMENT_OUTCOME_SCHEMA } from "schemas";
import { recordSelector, authSelector } from "features";
import { useSelector } from "react-redux";
import { useNewTreatmentOutcomeMutation } from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TBTreatmentOutcome = () => {
  const record = useSelector(recordSelector);
  const auth = useSelector(authSelector);
  const navigate = useNavigate();
  const [newTreatmentOutcome, { isLoading }] = useNewTreatmentOutcomeMutation();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TB_TREATMENT_OUTCOME_SCHEMA),
  });

  async function handleTreatmentOutcome(data) {
    const request = {
      ...auth,
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

  return (
    <FlexGrid fullWidth className="page">
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

      <Form onSubmit={handleSubmit(handleTreatmentOutcome)}>
        <Stack gap={7}>
          <br />
          <div class="accordion--row">
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
            <Accordion>
              <AccordionItem
                title={
                  <span className="accordion--title">
                    View follow up recorded
                  </span>
                }
              >
                <Stack gap={5}>
                  <p>xray:</p>
                  <p>Amoxicilin:</p>
                  <p>Other Antibiotic:</p>
                  <p>Follow up date(Y-m-d):</p>
                  <p>Comments:</p>
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
                <Stack gap={5}>
                  <p>Outcome:</p>
                  <p> TB RX number:</p>
                  <p> Comments:</p>
                </Stack>
              </AccordionItem>
            </Accordion>
          </div>
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

export default TBTreatmentOutcome;
