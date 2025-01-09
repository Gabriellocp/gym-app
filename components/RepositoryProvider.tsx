import SQLiteRepository from "@/infra/database/SQLiteDatabase";
import { Exercise, Workout } from "@/domain/models";
import { IRepository } from "@/domain/interfaces/repositories/IRepository";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SQLExerciseRepository from "@/infra/repositories/SQLExerciseRepository";
import SQLWorkoutRepository from "@/infra/repositories/SQLWorkoutRepository";
import { SQLiteDatabase } from "expo-sqlite";
import { IWorkoutRepository } from "@/domain/interfaces/repositories/IWorkoutRepository";
import { IExerciseRepository } from "@/domain/interfaces/repositories/IExerciseRepository";

type RepositoryProviderProps = {
  children: ReactNode;
};
type RepositoryContextProps = {
  db?: any;
  workoutRepository?: IWorkoutRepository;
  exerciseRepository?: IExerciseRepository;
};

const RepoContext = createContext<RepositoryContextProps>({
  db: undefined,
  exerciseRepository: undefined,
  workoutRepository: undefined,
});
export const useRepositoryContext = () => useContext(RepoContext);
export default function RepositoryProvider({
  children,
}: RepositoryProviderProps) {
  const [repositories, setRepositories] = useState<RepositoryContextProps>({});

  const makeRepositories = useCallback(
    (db: SQLiteDatabase): RepositoryContextProps => {
      return {
        db,
        exerciseRepository: new SQLExerciseRepository(db),
        workoutRepository: new SQLWorkoutRepository(db),
      };
    },
    []
  );

  useEffect(() => {
    const handleConnect = async () => {
      try {
        const sqlite = new SQLiteRepository();
        await sqlite.connect("workouts.db");
        setRepositories(makeRepositories(sqlite.db!));
      } catch (err) {}
    };
    handleConnect();
  }, []);
  return (
    <RepoContext.Provider value={repositories}>{children}</RepoContext.Provider>
  );
}
