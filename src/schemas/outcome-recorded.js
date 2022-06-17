import * as yup from "yup";

export const OUTCOME_RECORDED_SCHEMA = yup.object({
  outcome_recorded_started_tb_treatment_outcome: yup
    .string()
    .oneOf(["started_tb_treatment", "referred_for_treatment", "other"])
    .default("started_tb_treatment"),
  outcome_recorded_tb_rx_number: yup
    .string()
    .when("outcome_recorded_started_tb_treatment_outcome", {
      is: "started_tb_treatment",
      then: (schema) => schema.required("Field is required"),
    }),
  outcome_recorded_other: yup
    .string()
    .when("outcome_recorded_started_tb_treatment_outcome", {
      is: "other",
      then: (schema) => schema.required("Field is required"),
    }),
  outcome_recorded_comments: yup.string(),
});
