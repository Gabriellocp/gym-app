import { Workout } from "@/domain/models";
import { IWorkoutControlService } from "@/domain/interfaces/services/IWorkoutControlService";
import { IWorkoutService } from "@/domain/interfaces/services/IWorkoutService";
import { createContext, ReactNode, useContext, useState } from "react";

type WorkoutContext =
  | ({
      workouts: Workout[];
      update: React.Dispatch<React.SetStateAction<Workout[]>>;
      add: (workout: Workout) => Workout | false;
    } & IWorkoutService<Workout> &
      IWorkoutControlService)
  | null;

const WorkoutContext = createContext<WorkoutContext>(null);
export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("Context not provided");
  }
  return context;
};
export default function WorkoutProvider({
  service,
  control,
  children,
}: {
  service: IWorkoutService;
  control: IWorkoutControlService;
  children: ReactNode;
}) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const handleAddWorkout = (workout: Workout) => {
    const alreadyExist = workouts.find((w) => w.name === workout.name);
    if (alreadyExist) {
      return false;
    }
    setWorkouts((prev) => [...prev, workout]);
    return workout;
  };
  const handleLoad = async () => {
    const data = await service.loadAll();
    setWorkouts(data);
    return data;
  };
  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        update: setWorkouts,
        add: handleAddWorkout,
        save: service.save,
        loadAll: handleLoad,
        loadById: service.loadById,
        remove: service.remove,
        startSet: control.startSet,
        finishSet: control.finishSet,
        pauseSet: control.pauseSet,
        resumeSet: control.resumeSet,
        start: control.start,
        select: control.select,
        finishWorkout: control.finishWorkout,
        workoutStatus: control.workoutStatus,
        getUnfinishedWorkout: control.getUnfinishedWorkout,
        canFinishWorkout: control.canFinishWorkout,
        resetWorkout: control.resetWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
