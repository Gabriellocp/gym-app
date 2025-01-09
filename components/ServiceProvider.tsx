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

type ServiceContextProps = {
  workoutService?: IWorkoutService;
  workoutControlService?: IWorkoutControlService;
};
type ServiceProviderProps = {
  children: ReactNode;
};
const ServiceContext = createContext<ServiceContextProps>({
  workoutControlService: undefined,
  workoutService: undefined,
});

export const useServiceContext = () => useContext(ServiceContext);
export default function ServiceProvider({ children }: ServiceProviderProps) {
  const { db, exerciseRepository, workoutRepository } = useRepositoryContext();
  const makeServices = useCallback(() => {
    const workoutControlService = new WorkoutControlService(
      WorkoutLocalControlService
    );
    const workoutService = new WorkoutService({
      workoutRepo: workoutRepository,
      exerciseRepo: exerciseRepository,
      workUnit: new SQLiteWorkoutUnitOfWork(db),
    });
    return {
      workoutControlService,
      workoutService,
    };
  }, [db]);
  return (
    <ServiceContext.Provider value={makeServices()}>
      {children}
    </ServiceContext.Provider>
  );
}
