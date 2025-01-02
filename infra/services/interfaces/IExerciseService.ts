import { IExercise, IWorkout } from "@/infra/models";

export interface IExerciceService<T = any> {
    save: (workoutName: string, exercises: IExercise[]) => Promise<T>,
    loadAll: () => Promise<IWorkout[]>,
    loadById: (id: string) => Promise<IWorkout | null>,
    remove: (id: string) => Promise<void>
}
