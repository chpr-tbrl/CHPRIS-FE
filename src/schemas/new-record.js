import * as yup from "yup";

export const NEW_RECORD_SCHEMA = yup.object({
  site_id: yup.number().positive().integer().required("Field is required"),
  region_id: yup.number().positive().integer().required("Field is required"),
  records_age: yup
    .number()
    .positive("Field is required")
    .integer()
    .required("Field is required")
    .typeError("Field is required"),
  records_name: yup.string().required("Field is required"),
  records_sex: yup
    .string()
    .oneOf(["male", "female", "unknown"])
    .default("unknown")
    .required("Field is required"),
  records_date_of_test_request: yup
    .date()
    .required("Field is required")
    .typeError("Field is required"),
  records_address: yup.string().required("Field is required"),
  records_telephone: yup.string().required("Field is required"),
  records_telephone_2: yup.string().nullable(),
  records_has_art_unique_code: yup
    .string()
    .oneOf(["yes", "no", "unknown"])
    .default("unknown")
    .required("Field is required"),
  records_art_unique_code: yup
    .string()
    .default("")
    .nullable()
    .when("records_has_art_unique_code", {
      is: "yes",
      then: (schema) => schema.required("Field is required"),
    }),
  records_status: yup
    .string()
    .oneOf(["outpatient", "ward-bed"])
    .default("outpatient")
    .required("Field is required"),
  records_ward_bed_number: yup
    .string()
    .default("")
    .nullable()
    .when("records_status", {
      is: "ward-bed",
      then: (schema) => schema.required("Field is required"),
    }),
  records_currently_pregnant: yup
    .string()
    .oneOf(["yes", "no"])
    .default("no")
    .required("Field is required"),
  records_symptoms_current_cough: yup.bool().default(false),
  records_symptoms_fever: yup.bool().default(false),
  records_symptoms_night_sweats: yup.bool().default(false),
  records_symptoms_weight_loss: yup.bool().default(false),
  records_symptoms_none_of_the_above: yup.bool().default(true),
  records_tb_type: yup
    .string()
    .oneOf([
      "pulmonary",
      "extrapulmonary",
      "pulmonary_and_extrapulmonary",
      "unknown",
    ])
    .default("unknown"),
  records_patient_category_hospitalized: yup.bool().default(false),
  records_patient_category_child: yup.bool().default(false),
  records_patient_category_to_initiate_art: yup.bool().default(false),
  records_patient_category_on_art_symptomatic: yup.bool().default(false),
  records_patient_category_outpatient: yup.bool().default(false),
  records_patient_category_anc: yup.bool().default(false),
  records_patient_category_diabetes_clinic: yup.bool().default(false),
  records_patient_category_prisoner: yup.bool().default(false),
  records_patient_category_other: yup.string(),
  records_reason_for_test: yup
    .string()
    .oneOf([
      "presumptive_tb",
      "on_rhez",
      "on_retreatment",
      "on_mdr_tb_treatment",
      "n_a",
    ])
    .default("n_a"),
  records_reason_for_test_follow_up_months: yup
    .number()
    .nullable()
    .default(null)
    .when("records_reason_for_test", {
      is: (value) => value === "n_a" || value === "presumptive_tb",
      otherwise: (schema) =>
        schema.required("Field is required").typeError("field is required"),
    }),
  records_tb_treatment_history: yup
    .string()
    .oneOf([
      "new",
      "after_loss_to_follow_up",
      "relapse_after_retreatment_regimen",
      "failure_after_retreatment_regimen",
      "default_after_retreatment_regimen",
      "currently_on_mdr_regimen",
      "relapse_after_mdr_regimen",
      "failure_after_mdr_regimen",
      "default_after_mdr_regimen",
      "mdr_tb_contact",
      "prisoner_tb_treatment_history_unknown",
      "contact_of_tb_patient",
      "unknown",
      "other",
    ])
    .default("unknown")
    .required("Field is required"),
  records_tb_treatment_history_contact_of_tb_patient: yup.bool().nullable(),
  records_tb_treatment_history_other: yup.string().nullable(),
  records_tb_treatment_number: yup.string().nullable(),
  records_sms_notifications: yup.bool().default(false),
  records_requester_name: yup.string().nullable(),
  records_requester_telephone: yup.string().nullable(),
});
