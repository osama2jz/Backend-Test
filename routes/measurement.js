import express from "express";
import {
  addMeasurement,
  deleteMeasurement,
  editMeasurement,
  viewAllMeasurements,
} from "../controllers/measurement.js";

const router = express.Router();

router.post("/addMeasurement", addMeasurement);
router.put("/editMeasurement/:id", editMeasurement);
router.get("/allMeasurements", viewAllMeasurements);
router.delete("/deleteMeasurement/:id", deleteMeasurement);

export default router;
