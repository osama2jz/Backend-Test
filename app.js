import express from "express";
import mongoose from "mongoose";
import ProfilingRouter from "./routes/user-profiling.js";
import MeasurementRouter from "./routes/measurement.js";
const app = express();

// Body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running." });
});

//routes
app.use("/", ProfilingRouter);
app.use("/", MeasurementRouter);

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  app.listen(6969, () => console.log("We are live with DB (maybe)"));
});
