import { object, string } from "yup";

//signin schema
export const userSchema = object({
  username: string().required(),
  password: string().required(),
});

//signup schema
export const signUpSchema = object({
  username: string().required(),
  password: string().required(),
  firstName: string().required(),
  lastName: string().required(),
});

//signup schema
export const changePasswordSchema = object({
  oldPassword: string().required(),
  newPassword: string().required(),
});
