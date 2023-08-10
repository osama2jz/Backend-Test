import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: [true, "First Name is Required."] },
  lastName: { type: String, required: [true, "Last Name is Required."] },
  username: {
    type: String,
    required: [true, "Username is Required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required."],
    select: false,
  },
});
const user = mongoose.model("User", userSchema);
export default user;
