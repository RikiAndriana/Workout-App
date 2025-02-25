import mongoose from "mongoose";
import Workout from "../models/Workout.js";

// create new workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      load,
      reps,
      user_id,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all workouts
export const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get detail workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Such workout" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// update a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No Such workout" });
  }

  const workout = await Workout.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};
