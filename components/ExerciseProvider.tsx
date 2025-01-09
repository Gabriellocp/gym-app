import { Exercise, Workout } from "@/domain/models";
import { createContext, ReactNode, useContext, useState } from "react";

type ExerciseContext = {
  exercises: Exercise[];
  create: (exercise: Exercise) => Exercise | false;
  remove: (exercise: Exercise) => void;
} | null;

const ExerciseContext = createContext<ExerciseContext>(null);
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
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const handleCreateExercise = (exercise: Exercise) => {
    const alreadyExist = exercises.find((ex) => ex.name === exercise.name);
    if (alreadyExist) {
      return false;
    }
    setExercises((prev) => [...prev, exercise]);
    return exercise;
  };
  const handleRemove = (exercise: Exercise) => {
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
