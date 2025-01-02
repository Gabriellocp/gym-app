import { IExercise } from "@/app/workout/create";
import { createContext, ReactNode, useContext, useState } from "react";

type ICreateExerciseContext = {
  exercises: IExercise[];
  create: (exercise: IExercise) => IExercise | false;
} | null;

const CreateExerciseContext = createContext<ICreateExerciseContext>(null);
export const useCreateExerciseContext = () => {
  const context = useContext(CreateExerciseContext);
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
    <CreateExerciseContext.Provider
      value={{
        exercises,
        create: handleCreateExercise,
      }}
    >
      {children}
    </CreateExerciseContext.Provider>
  );
}
