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
import {
  makeExerciseHistoryRepo,
  makeExerciseRepo,
  makeWorkoutHistoryRepo,
  makeWorkoutRepo,
} from "@/main/factories";
import { Text } from "react-native";
import { SplashScreen } from "expo-router";

type RepositoryProviderProps = {
  children: ReactNode;
};
type RepositoryContextProps = {
  workoutRepository?: IWorkoutRepository;
  exerciseRepository?: IExerciseRepository;
  workoutHistoryRepository?: IWorkoutHistoryRepository;
  exerciseHistoryRepository?: IExerciseHistoryRepository;
};
SplashScreen.preventAutoHideAsync();
const RepoContext = createContext<RepositoryContextProps>({
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
  const [isConnected, setIsConnected] = useState(false);
  const makeRepositories = useCallback((): RepositoryContextProps => {
    return {
      exerciseRepository: makeExerciseRepo(),
      workoutRepository: makeWorkoutRepo(),
      exerciseHistoryRepository: makeExerciseHistoryRepo(),
      workoutHistoryRepository: makeWorkoutHistoryRepo(),
    };
  }, []);

  useEffect(() => {
    const handleConnect = async () => {
      try {
        const sqlite = new SQLiteRepository();
        await sqlite.connect("workouts.db");
        setRepositories(makeRepositories());
        setIsConnected(true);
      } catch (err) {
        console.log(err);
      }
    };
    handleConnect();
  }, []);

  useEffect(() => {
    if (isConnected) SplashScreen.hideAsync();
  }, [isConnected]);
  if (!isConnected) {
    return null;
  }
  return (
    <RepoContext.Provider value={repositories}>{children}</RepoContext.Provider>
  );
}
