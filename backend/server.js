import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// router
import workoutRouter from "./routes/workoutsRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/workouts", workoutRouter);
app.use("/api/user", userRouter);

// connect to db & listening on port
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `connected to db & listening on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log(error));
