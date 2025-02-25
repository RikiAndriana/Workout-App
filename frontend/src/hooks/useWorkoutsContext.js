import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkoutsContext must be used inside an WorkoutContextProvider"
    );
  }
  return context;
};
