import { IExercise, IWorkout } from "@/infra/models";
import { createContext, ReactNode, useContext, useState } from "react";

type IExerciseContext = {
  exercises: IExercise[];
  create: (exercise: IExercise) => IExercise | false;
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

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        create: handleCreateExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
