import mongoose from "mongoose";
import { string } from "yup";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Username is Required."],
    unique: true,
  },
  firstName: { type: String, required: [true, "First Name is Required."] },
  lastName: { type: String, required: [true, "Last Name is Required."] },
  password: {
    type: String,
    required: [true, "Password is Required."],
    select: false,
  },
  phoneNumber: { type: String, required: [true, "Phone Number is required."] },
  userType: {
    type: String,
    enum: ["Tailor", "Customer"],
    required: [true, "User Type is required."],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required."],
  },
});
const user = mongoose.model("User", userSchema);
export default user;
