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
    .typeError("Field is required")
    .required("Field is required"),

  specimen_collection_2_specimen_collection_type: yup
    .string()
    .oneOf([
      "sputum",
      "csf",
      "lymph_node_aspirate",
      "gastric_aspirate",
      "urine",
      "other",
    ])
    .default("sputum")
    .required("Field is required"),
  specimen_collection_2_other: yup
    .string()
    .default("")
    .when("specimen_collection_2_specimen_collection_type", {
      is: "other",
      then: (schema) => schema.required("Field is required"),
    }),
  specimen_collection_2_period: yup
    .string()
    .oneOf(["spot", "morning", "n_a"])
    .default("spot")
    .when("specimen_collection_2_specimen_collection_type", {
      is: "sputum",
      then: (schema) => schema.required("Field is required"),
    }),
  specimen_collection_2_aspect: yup
    .string()
    .oneOf(["mucopurulent", "bloody", "salivary", "n_a"])
    .default("mucopurulent")
    .when("specimen_collection_2_specimen_collection_type", {
      is: "sputum",
      then: (schema) => schema.required("Field is required"),
    }),
  specimen_collection_2_received_by: yup.string().required("Field is required"),
});
