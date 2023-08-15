import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId is required."],
  },
  measurementId: {
    type: Schema.Types.ObjectId,
    ref: "Measurement",
    required: [true, "measurementId is reuquired."],
  },
  price: {
    type: Number,
    required: [true, "price is required."],
  },
  status: {
    type: String,
    enum: ["new", "completed", "delivered"],
    default: "new",
  },
  completionDate: {
    type: Date,
  },
});
const order = mongoose.model("Order", orderSchema);
export default order;
