import * as yup from "yup";

export const USER_UPDATE_SCHEMA = yup.object().shape({
  name: yup.string(),
  phone_number: yup.string(),
  occupation: yup.string(),
  current_password: yup.string(),
  new_password: yup.string().when("current_password", (current_password) => {
    if (current_password)
      return yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("please enter new password");
  }),
  confirmPassword: yup.string().when("new_password", (new_password) => {
    if (new_password)
      return yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("please re-enter new password")
        .oneOf(
          [yup.ref("new_password"), null],
          "password confirmation does not match new password"
        );
  }),
});
