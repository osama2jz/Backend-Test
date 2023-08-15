import express from "express";
import {
  addOrder,
  deleteOrder,
  editOrder,
  viewAllOrders,
} from "../controllers/order.js";

const router = express.Router();

router.post("/addOrder", addOrder);
router.put("/editOrder/:id", editOrder);
router.get("/allOrders", viewAllOrders);
router.delete("/deleteOrder/:id", deleteOrder);

export default router;
