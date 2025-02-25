import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    reps: {
      type: Number,
      required: [true, "reps is required"],
    },
    load: {
      type: Number,
      required: [true, "load is required"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Workout", workoutSchema);
