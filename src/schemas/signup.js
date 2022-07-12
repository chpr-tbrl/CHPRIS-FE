import * as yup from "yup";

export const sIGNUP_SCHEMA = yup.object({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email().required("please enter an email"),
  phone_number: yup
    .string()
    .min(9, "please enter a valid phone_number")
    .required("please enter a valid phone_number"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("please enter a password"),
  confirm_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
  occupation: yup.string().required("please enter your occupation"),
  site_id: yup.number().required("please please select a site"),
  region_id: yup.number().required("please select a region"),
  sms_notifications_type: yup
    .string()
    .oneOf(["all", "positive"])
    .default("positive")
    .nullable()
    .required("Field is required"),
});
