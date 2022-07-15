import * as yup from "yup";

export const SPECIMEN_COLLECTION_SCHEMA = yup.object({
  specimen_collection_1_date: yup
    .date()
    .typeError("Field is required")
    .required("Field is required"),
  specimen_collection_1_specimen_collection_type: yup
    .string()
    .oneOf([
      "sputum",
      "csf",
      "lymph_node_aspirate",
      "gastric_aspirate",
      "urine",
      "abscess",
      "bronchoalveolar_aspirate",
      "isolate_from_sputum",
      "isolate_from_specimen_not_sputum",
      "pleural_fluid",
      "unk_unknown",
      "other",
    ])
    .default("sputum")
    .required("Field is required"),
  specimen_collection_1_other: yup
    .string()
    .default("")
    .when("specimen_collection_1_specimen_collection_type", {
      is: "other",
      then: (schema) => schema.required("Field is required"),
    }),
  specimen_collection_1_period: yup
    .string()
    .oneOf(["spot", "morning", "n_a"])
    .default("spot")
    .when("specimen_collection_1_specimen_collection_type", {
      is: "sputum",
      then: (schema) => schema.required("Field is required"),
    }),
  specimen_collection_1_aspect: yup
    .string()
    .oneOf(["mucopurulent", "bloody", "salivary", "n_a"])
    .default("mucopurulent")
    .when("specimen_collection_1_specimen_collection_type", {
      is: "sputum",
      then: (schema) => schema.required("Field is required"),
    }),
  specimen_collection_1_received_by: yup.string().required("Field is required"),
  specimen_collection_2_date: yup
    .date()
    .nullable()
    .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
    .typeError("Field is required"),
  specimen_collection_2_specimen_collection_type: yup
    .string()
    .nullable()
    .default("")
    .when("specimen_collection_2_date", {
      is: (value) => value != null,
      then: (schema) =>
        schema
          .oneOf([
            "sputum",
            "csf",
            "lymph_node_aspirate",
            "gastric_aspirate",
            "urine",
            "abscess",
            "bronchoalveolar_aspirate",
            "isolate_from_sputum",
            "isolate_from_specimen_not_sputum",
            "pleural_fluid",
            "unk_unknown",
            "other",
          ])
          .required("Field is required"),
    }),
  specimen_collection_2_other: yup
    .string()
    .default("")
    .when("specimen_collection_2_specimen_collection_type", {
      is: "other",
      then: (schema) => schema.required("Field is required"),
    }),
  specimen_collection_2_period: yup
    .string()
    .nullable()
    .default("n_a")
    .when("specimen_collection_2_specimen_collection_type", {
      is: "sputum",
      then: (schema) =>
        schema.oneOf(["spot", "morning", "n_a"]).required("Field is required"),
    }),
  specimen_collection_2_aspect: yup
    .string()
    .nullable()
    .default("n_a")
    .when("specimen_collection_2_specimen_collection_type", {
      is: "sputum",
      then: (schema) =>
        schema
          .oneOf(["mucopurulent", "bloody", "salivary", "n_a"])
          .required("Field is required"),
    }),
  specimen_collection_2_received_by: yup
    .string()
    .when("specimen_collection_2_date", {
      is: (value) => value != null,
      then: (schema) => schema.required("Field is required"),
    }),
});
