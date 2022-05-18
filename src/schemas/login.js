import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().email().required("please enter your email"),
  password: yup.string().required("please enter your password"),
});
