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
    .oneOf(["male", "female"])
    .default("female")
    .required("Field is required"),
  records_date_of_test_request: yup.date().required("Field is required"),
  records_address: yup.string().required("Field is required"),
  records_telephone: yup.string().required("Field is required"),
  records_telephone_2: yup.string(),
  records_has_art_unique_code: yup
    .string()
    .oneOf(["yes", "no", "unknown"])
    .default("unknown")
    .required("Field is required"),
  records_art_unique_code: yup.string().when("records_has_art_unique_code", {
    is: "yes",
    then: (schema) => schema.required("Field is required"),
  }),
  records_status: yup
    .string()
    .oneOf(["outpatient", "ward-bed"])
    .default("outpatient")
    .required("Field is required"),
  records_ward_bed_number: yup.string().when("records_status", {
    is: "ward-bed",
    then: (schema) => schema.required("Field is required"),
  }),
  records_currently_pregnant: yup
    .string()
    .oneOf(["yes", "no"])
    .default("no")
    .required("Field is required"),
  records_symptoms_current_cough: yup.bool(),
  records_symptoms_fever: yup.bool(),
  records_symptoms_night_sweats: yup.bool(),
  records_symptoms_weight_loss: yup.bool(),
  records_symptoms_none_of_the_above: yup.bool(),
  records_patient_category_hospitalized: yup.bool(),
  records_patient_category_child: yup.bool(),
  records_patient_category_to_initiate_art: yup.bool(),
  records_patient_category_on_art_symptomatic: yup.bool(),
  records_patient_category_outpatient: yup.bool(),
  records_patient_category_anc: yup.bool(),
  records_patient_category_diabetes_clinic: yup.bool(),
  records_patient_category_other: yup.string(),
  records_reason_for_test_presumptive_tb: yup.bool(),
  records_tb_treatment_history: yup
    .string()
    .oneOf(["new", "relapse", "after_loss_to_follow_up", "failure"])
    .default("new")
    .required("Field is required"),
  records_tb_treatment_history_contact_of_tb_patient: yup.string(),
});
