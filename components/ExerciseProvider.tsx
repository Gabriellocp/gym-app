import { IExercise, IWorkout } from "@/infra/models";
import { createContext, ReactNode, useContext, useState } from "react";

type IExerciseContext = {
  exercises: IExercise[];
  create: (exercise: IExercise) => IExercise | false;
  remove: (exercise: IExercise) => void;
} | null;

const ExerciseContext = createContext<IExerciseContext>(null);
export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("Context not provided");
  }
  return context;
};
export default function CreateExerciseProvider({
  children,
}: {
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
  const handleRemove = (exercise: IExercise) => {
    const exToRemove = exercises.find((ex) => ex.name === exercise.name);
    setExercises((prev) => [...prev].filter((e) => e !== exToRemove));
  };
  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        create: handleCreateExercise,
        remove: handleRemove,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
