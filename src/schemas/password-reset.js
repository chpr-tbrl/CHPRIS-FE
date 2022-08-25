import * as yup from "yup";

export const PASSWORD_RESET_SCHEMA = yup.object({
  new_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("please enter a password"),
  confirm_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please confirm your password")
    .oneOf([yup.ref("new_password"), null], "Passwords do not match"),
});
