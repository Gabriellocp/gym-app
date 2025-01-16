import { Exercise, Workout } from "@/domain/models";
import { createContext, ReactNode, useContext, useState } from "react";

type ExerciseContext = {
  exercises: Exercise[];
  create: (exercise: Exercise) => Exercise | false;
  update: (exercise: Exercise) => void;
  remove: (exercise: Exercise) => void;
  reset: () => void;
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
    const alreadyExist = exercises.find((ex) => ex.id === exercise.id);
    if (alreadyExist) {
      return false;
    }
    setExercises((prev) => [...prev, exercise]);
    return exercise;
  };
  const handleRemove = (exercise: Exercise) => {
    const exToRemove = exercises.find((ex) => ex.id === exercise.id);
    setExercises((prev) => [...prev].filter((e) => e !== exToRemove));
  };
  const handleReset = () => {
    setExercises([]);
  };
  const handleUpdate = (exercise: Exercise) => {
    setExercises((prev) =>
      [...prev].map((e) => (e.id === exercise.id ? exercise : e))
    );
  };
  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        update: handleUpdate,
        create: handleCreateExercise,
        remove: handleRemove,
        reset: handleReset,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}
