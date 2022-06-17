import * as yup from "yup";

export const LAB_RESULTS_SCHEMA = yup.object({
  lab_date_specimen_collection_received: yup
    .date()
    .required("Field is required"),
  lab_received_by: yup.string().required("Field is required"),
  lab_registration_number: yup.string().required("Field is required"),
  lab_smear_microscopy_result_result_1: yup
    .string()
    .oneOf([
      "no_afb_seen",
      "scanty",
      "1+",
      "2+",
      "3+",
      "tb_lamp_positive",
      "tb_lamp_negative",
      "not_done",
    ])
    .default("not_done")
    .required("Field is required"),
  lab_smear_microscopy_result_result_2: yup
    .string()
    .oneOf([
      "no_afb_seen",
      "scanty",
      "1+",
      "2+",
      "3+",
      "tb_lamp_positive",
      "tb_lamp_negative",
      "not_done",
    ])
    // .default("not_done")
    .when("lab_smear_microscopy_result_result_1", {
      is: "not_done",
      otherwise: (schema) =>
        schema.default("not_done").required("Field is required"),
    }),
  lab_smear_microscopy_result_date: yup
    .date()
    .when("lab_smear_microscopy_result_result_1", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),
  lab_smear_microscopy_result_done_by: yup
    .string()
    .when("lab_smear_microscopy_result_result_1", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_result: yup
    .string()
    .oneOf(["detected", "trace", "not_detected", "error_invalid", "not_done"])
    .default("not_done")
    .required("Field is required"),
  lab_xpert_mtb_rif_assay_grades: yup
    .string()
    .oneOf(["high", "medium", "low", "very_low"])
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "detected",
      then: (schema) =>
        schema.default("very_low").required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_rif_result: yup
    .string()
    .oneOf(["detected", "indeterminate", "not_detected", "not_done"])
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "detected",
      then: (schema) =>
        schema.default("not_done").required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_date: yup
    .date()
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_done_by: yup
    .string()
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),
  lab_urine_lf_lam_result: yup
    .string()
    .oneOf(["negative", "positive", "error_invalid", "not_done"])
    .default("not_done")
    .required("Field is required"),
  lab_urine_lf_lam_date: yup.date().when("lab_urine_lf_lam_result", {
    is: "not_done",
    otherwise: (schema) => schema.required("Field is required"),
  }),
  lab_urine_lf_lam_done_by: yup.string().when("lab_urine_lf_lam_result", {
    is: "not_done",
    otherwise: (schema) => schema.required("Field is required"),
  }),
});
