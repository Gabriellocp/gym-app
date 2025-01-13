import { IWorkoutControlService } from "@/domain/interfaces/services/IWorkoutControlService";
import { IWorkoutService } from "@/domain/interfaces/services/IWorkoutService";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useRepositoryContext } from "./RepositoryProvider";
import WorkoutControlService from "@/application/services/WorkoutControlService";
import WorkoutLocalControlService from "@/application/services/WorkoutLocalControlService";
import WorkoutService from "@/application/services/WorkoutService";
import SQLiteWorkoutUnitOfWork from "@/infra/uow/SQLiteWorkoutUnitOfWork";
import { IWorkoutHistoryService } from "@/domain/interfaces/services/IWorkoutHistoryService";
import WorkoutHistoryService from "@/application/services/WorkoutHistoryService";

type ServiceContextProps = {
  workoutService?: IWorkoutService;
  workoutControlService?: IWorkoutControlService;
  historyService?: IWorkoutHistoryService;
};
type ServiceProviderProps = {
  children: ReactNode;
};
const ServiceContext = createContext<ServiceContextProps>({
  workoutControlService: undefined,
  workoutService: undefined,
  historyService: undefined,
});

export const useServiceContext = () => useContext(ServiceContext);
export default function ServiceProvider({ children }: ServiceProviderProps) {
  const {
    db,
    exerciseRepository,
    workoutRepository,
    exerciseHistoryRepository,
    workoutHistoryRepository,
  } = useRepositoryContext();
  const makeServices = useCallback(() => {
    const workoutService = new WorkoutService({
      workoutRepo: workoutRepository,
      exerciseRepo: exerciseRepository,
      workUnit: new SQLiteWorkoutUnitOfWork(db),
    });
    const historyService = new WorkoutHistoryService({
      workoutHistoryRepo: workoutHistoryRepository!,
      exerciseHistoryRepo: exerciseHistoryRepository!,
      workUnit: new SQLiteWorkoutUnitOfWork(db),
    });
    const workoutControlService = new WorkoutControlService({
      storage: WorkoutLocalControlService,
      workoutHistoryService: historyService!,
    });
    return {
      workoutControlService,
      workoutService,
      historyService,
    };
  }, [db]);
  return (
    <ServiceContext.Provider value={makeServices()}>
      {children}
    </ServiceContext.Provider>
  );
}
