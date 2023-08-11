import express from "express";
import { addMeasurement } from "../controllers/measurement.js";

const router = express.Router();

router.post("/add-measurement", addMeasurement);

export default router;
