import { IExercise, IWorkout } from "@/infra/models";
import { IExerciceService } from "@/infra/services/interfaces/IExerciseService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ICreateExerciseContext = {
  exercises: IExercise[];
  create: (exercise: IExercise) => IExercise | false;
  save: (name: string, exercises: IExercise[]) => Promise<boolean>;
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
  useEffect(() => {
    const fetch = async () => {
      console.log(await service.loadAll());
    };
    fetch();
  }, []);
  return (
    <CreateExerciseContext.Provider
      value={{
        exercises,
        create: handleCreateExercise,
        save: service.save,
      }}
    >
      {children}
    </CreateExerciseContext.Provider>
  );
}
