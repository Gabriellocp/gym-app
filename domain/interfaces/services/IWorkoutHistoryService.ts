import { WorkoutHistory } from "@/domain/models";

export interface IWorkoutHistoryService {
    add: (model: WorkoutHistory) => Promise<void>
    getHistory: () => Promise<WorkoutHistory[]>
    // delete: (id:string) => Promise<boolean>
}