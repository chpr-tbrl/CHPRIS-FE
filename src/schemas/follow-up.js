import * as yup from "yup";

export const FOLLOW_UP_SCHEMA = yup.object({
  follow_up_xray: yup.bool(),
  follow_up_amoxicillin: yup.bool(),
  follow_up_other_antibiotic: yup.string(),
  follow_up_schedule_date: yup
    .date()
    .required("Field is required")
    .typeError("Field is required"),
  follow_up_comments: yup.string(),
});
