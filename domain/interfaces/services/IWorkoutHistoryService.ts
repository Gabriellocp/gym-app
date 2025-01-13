import { ExerciseHistory, WorkoutHistory } from "@/domain/models";

export interface IWorkoutHistoryService {
    add: (model: WorkoutHistory) => Promise<void>
    getHistory: () => Promise<WorkoutHistory[]>
    getExercisesByHistory: (id: number) => Promise<ExerciseHistory[]>
    // delete: (id:string) => Promise<boolean>
}