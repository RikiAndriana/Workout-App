import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
  const { user } = useAuthContext();
  const { workouts, dispatch } = useWorkoutsContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_WORKOUTS",
          payload: data,
        });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
