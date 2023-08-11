import { number, object, string } from "yup";

//signup schema
export const addMeasurementSchema = object({
  userId: string().required(),
  waist: object().required(),
  length: object().required(),
  collar: object().required(),
  shoulder: object().required(),
});