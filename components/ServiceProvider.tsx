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
import {
  makeWorkoutControlService,
  makeWorkoutHistoryService,
  makeWorkoutService,
} from "@/main/factories";

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
  const makeServices = useCallback(() => {
    const workoutService = makeWorkoutService();
    const historyService = makeWorkoutHistoryService();
    const workoutControlService = makeWorkoutControlService();
    return {
      workoutControlService,
      workoutService,
      historyService,
    };
  }, []);
  return (
    <ServiceContext.Provider value={makeServices()}>
      {children}
    </ServiceContext.Provider>
  );
}
