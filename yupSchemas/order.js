import { date, number, object, string } from "yup";

//addorder schema
export const addOrderSchema = object({
  userId: string().required(),
  measurementId: string().required(),
  price: number().required(),
  completionDate: date().required(),
});
