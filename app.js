import express from "express";
import ProfilingRouter from "./routes/user-profiling.js";
const app = express();

// Body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running mf" });
});

//user profiling
app.use("/", ProfilingRouter);

app.listen(6969, () => console.log("We are live (maybe)"));
