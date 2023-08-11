import mongoose from "mongoose";
import { string } from "yup";
const { Schema } = mongoose;

const measurementLengthSchema = new Schema({
  measurement: {
    type: Number,
    required: [true, "Waist is requierd"],
  },
  unit: {
    type: String,
    enum: ["cm", "in"],
    default: "in",
  },
});

const measurementSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is Required."],
  },
  waist: {
    type: measurementLengthSchema,
  },
  length: {
    type: measurementLengthSchema,
  },
  collar: {
    type: measurementLengthSchema,
  },
  shoulder: {
    type: measurementLengthSchema,
  },
});
const measurement = mongoose.model("Measurement", measurementSchema);
export default measurement;
