import { IExercise, IWorkout } from "@/infra/models";
import { IExerciceService } from "@/infra/services/interfaces/IExerciseService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type IExerciseContext =
  | ({
      exercises: IExercise[];
      create: (exercise: IExercise) => IExercise | false;
    } & IExerciceService)
  | null;

const ExerciseContext = createContext<IExerciseContext>(null);
export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("Context not provided");
  }
  return context;
};
export default function CreateExerciseProvider({
  service,
  children,
}: {
  service: IExerciceService;
  children: ReactNode;
}) {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const handleCreateExercise = (exercise: IExercise) => {
    const alreadyExist = exercises.find((ex) => ex.name === exercise.name);
    if (alreadyExist) {
      return false;
    }
    setExercises((prev) => [...prev, exercise]);
    return exercise;
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        create: handleCreateExercise,
        save: service.save,
        loadAll: service.loadAll,
        loadById: service.loadById,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
