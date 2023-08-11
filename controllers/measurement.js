import { addMeasurementSchema } from "../yupSchemas/measurement.js";
import measurement from "../models/measurementModel.js";
import user from "../models/userModel.js";

//add with monngo
export const addMeasurement = async (req, res) => {
  const data = req.body;
  try {
    addMeasurementSchema.validateSync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }

  try {
    //   console.log("here", data);
    const userFound = await user.findById(data.userId);
    if (userFound) {
      await measurement.create(data);
      res.json({ message: "Measurement added successfully" });
    }
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
};

//edit with mongo
export const editMeasurement = async (req, res) => {
  const _id = req.params.id;
  try {
    const found = await measurement.findOne({ _id });
    if (!found) {
      return res.status(404).json({ error: "Measurement not found" });
    }
    await measurement.findOneAndUpdate({ _id }, req.body);
    res.json({ message: "Measurement updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//all with mongo
export const viewAllMeasurements = async (req, res) => {
  try {
    const found = await measurement.find();
    res.json({ message: "Measurement Found.", data: found });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete with mongo
export const deleteMeasurement = async (req, res) => {
  const _id = req.params.id;
  try {
    const userFound = await measurement.findOne({ _id });
    if (!userFound) {
      return res.status(404).json({ error: "Measurement not found" });
    }
    await measurement.deleteOne({ _id });
    res.json({ message: "Measurement Deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
