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
import { IWorkoutHistoryRepository } from "@/domain/interfaces/repositories/IWorkoutHistoryRepository";
import { IExerciseHistoryRepository } from "@/domain/interfaces/repositories/IExerciseHistoryRepository";
import SQLWorkoutHistoryRepository from "@/infra/repositories/SQLWorkoutHistoryRepository";
import SQLExerciseHistoryRepository from "@/infra/repositories/SQLExerciseHistoryRepository";

type RepositoryProviderProps = {
  children: ReactNode;
};
type RepositoryContextProps = {
  db?: any;
  workoutRepository?: IWorkoutRepository;
  exerciseRepository?: IExerciseRepository;
  workoutHistoryRepository?: IWorkoutHistoryRepository;
  exerciseHistoryRepository?: IExerciseHistoryRepository;
};

const RepoContext = createContext<RepositoryContextProps>({
  db: undefined,
  exerciseRepository: undefined,
  workoutRepository: undefined,
  workoutHistoryRepository: undefined,
  exerciseHistoryRepository: undefined,
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
        exerciseHistoryRepository: new SQLExerciseHistoryRepository(db),
        workoutHistoryRepository: new SQLWorkoutHistoryRepository(db),
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
