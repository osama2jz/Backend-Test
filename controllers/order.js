import order from "../models/orderModel.js";
import { addOrderSchema } from "../yupSchemas/order.js";

//add with monngo
export const addOrder = async (req, res) => {
  const data = req.body;
  try {
    addOrderSchema.validateSync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }

  try {
    await order.create(data);
    res.json({ message: "Order added successfully", data });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit with mongo
export const editOrder = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await order.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all with mongo
export const viewAllOrders = async (req, res) => {
  try {
    const found = await order.find();
    res.json({ message: "Orders Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete with mongo
export const deleteOrder = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await order.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.deleteOne({ _id });
    res.json({ message: "Order Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
