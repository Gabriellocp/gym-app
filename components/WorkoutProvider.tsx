import { IWorkout } from "@/infra/models";
import { IWorkoutControlService } from "@/infra/services/interfaces/IWorkoutControlService";
import { IWorkoutService } from "@/infra/services/interfaces/IWorkoutService";
import { createContext, ReactNode, useContext, useState } from "react";

type IWorkoutContext =
  | ({
      workouts: IWorkout[];
      update: React.Dispatch<React.SetStateAction<IWorkout[]>>;
      add: (workout: IWorkout) => IWorkout | false;
    } & IWorkoutService &
      IWorkoutControlService)
  | null;

const WorkoutContext = createContext<IWorkoutContext>(null);
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
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const handleAddWorkout = (workout: IWorkout) => {
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
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
