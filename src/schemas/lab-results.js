import * as yup from "yup";

export const LAB_RESULTS_SCHEMA = yup.object({
  lab_date_specimen_collection_received: yup
    .date()
    .required("Field is required")
    .typeError("Field is required"),
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
    .default("not_done")
    .when("lab_smear_microscopy_result_result_1", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),
  lab_smear_microscopy_result_date: yup
    .string()
    .nullable()
    .default("")
    .when("lab_smear_microscopy_result_result_1", {
      is: "not_done",
      otherwise: () =>
        yup
          .date()
          .nullable()
          .required("Field is required")
          .typeError("Field is required")
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
    }),
  lab_smear_microscopy_result_done_by: yup
    .string()
    .default("")
    .when("lab_smear_microscopy_result_result_1", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_result: yup
    .string()
    .oneOf(["detected", "not_detected", "error_invalid", "not_done"])
    .default("not_done")
    .required("Field is required"),
  lab_xpert_mtb_rif_assay_grades: yup
    .string()
    .default("not_done")
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "detected",
      then: (schema) =>
        schema
          .oneOf(["high", "medium", "low", "very_low", "not_done"])
          .required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_rif_result: yup
    .string()
    .default("not_done")
    .oneOf([
      "detected",
      "indeterminate",
      "not_done",
      "not_detected",
      "not_done",
    ])
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "detected",
      then: (schema) => schema.required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_date: yup
    .string()
    .nullable()
    .default("")
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "not_done",
      otherwise: () =>
        yup
          .date()
          .nullable()
          .required("Field is required")
          .typeError("Field is required")
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
    }),
  lab_xpert_mtb_rif_assay_done_by: yup
    .string()
    .default("")
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),

  lab_xpert_mtb_rif_assay_result_2: yup
    .string()
    .oneOf(["detected", "not_detected", "error_invalid", "not_done"])
    .default("not_done")
    .required("Field is required"),
  lab_xpert_mtb_rif_assay_grades_2: yup
    .string()
    .default("not_done")
    .when("lab_xpert_mtb_rif_assay_result_2", {
      is: "detected",
      then: (schema) =>
        schema
          .oneOf(["high", "medium", "low", "very_low", "not_done"])
          .required("Field is required"),
    }),
  lab_xpert_mtb_rif_assay_rif_result_2: yup
    .string()
    .default("not_done")
    .oneOf([
      "detected",
      "indeterminate",
      "not_done",
      "not_detected",
      "not_done",
    ])
    .when("lab_xpert_mtb_rif_assay_result", {
      is: "detected",
      then: (schema) => schema.required("Field is required"),
    }),
  lab_culture_mgit_culture: yup
    .string()
    .oneOf(["tbc", "ntm", "negative", "contaminated", "not_done"])
    .default("not_done")
    .required("Field is required"),
  lab_culture_lj_culture: yup
    .string()
    .oneOf(["tbc", "ntm", "negative", "contaminated", "not_done"])
    .default("not_done")
    .required("Field is required"),
  lab_lpa_mtbdrplus_isoniazid: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),
  lab_lpa_mtbdrplus_rifampin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),
  lab_lpa_mtbdrs_flouoroquinolones: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),
  lab_lpa_mtbdrs_kanamycin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),
  lab_lpa_mtbdrs_amikacin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),
  lab_lpa_mtbdrs_capreomycin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),
  lab_lpa_mtbdrs_low_level_kanamycin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_isonazid: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_rifampin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_ethambutol: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_kanamycin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_ofloxacin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_levofloxacinekanamycin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_moxifloxacinekanamycin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_dst_amikacinekanamycin: yup
    .string()
    .oneOf(["resistant", "susceptible", "indeterminate", "not_done"])
    .default("not_done")
    .nullable()
    .required("Field is required"),

  lab_urine_lf_lam_result: yup
    .string()
    .oneOf(["negative", "positive", "error_invalid", "not_done"])
    .default("not_done")
    .required("Field is required"),
  lab_urine_lf_lam_date: yup
    .string()
    .default("")
    .typeError("Field is required")
    .nullable()
    .when("lab_urine_lf_lam_result", {
      is: "not_done",
      otherwise: () =>
        yup
          .date()
          .nullable()
          .required("Field is required")
          .typeError("Field is required")
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
    }),
  lab_urine_lf_lam_done_by: yup
    .string()
    .default("")
    .when("lab_urine_lf_lam_result", {
      is: "not_done",
      otherwise: (schema) => schema.required("Field is required"),
    }),
});
