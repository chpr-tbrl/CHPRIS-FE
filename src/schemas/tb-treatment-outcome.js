import * as yup from "yup";

export const TB_TREATMENT_OUTCOME_SCHEMA = yup.object({
  tb_treatment_outcome_result: yup
    .string()
    .oneOf([
      "cured",
      "treatment_completed",
      "lost_to_follow_up",
      "died",
      "transferred_out",
    ])
    .default("cured"),
  tb_treatment_outcome_comments: yup.string(),
  tb_treatment_outcome_close_patient_file: yup.bool(),
});
