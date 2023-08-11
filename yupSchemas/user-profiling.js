import { object, string } from "yup";

//signin schema
export const userSchema = object({
  email: string().required(),
  password: string().required(),
});

//signup schema
export const signUpSchema = object({
  email: string().required(),
  password: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  gender: string().required(),
  userType: string().required(),
  phoneNumber: string().required()
});

//change password schema
export const changePasswordSchema = object({
  oldPassword: string().required(),
  newPassword: string().required(),
});
