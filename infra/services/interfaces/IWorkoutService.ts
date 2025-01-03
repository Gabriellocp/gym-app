import { IWorkout } from "@/infra/models";

export interface IWorkoutService<T = any> {
    save: (workout: IWorkout) => Promise<T>,
    loadAll: () => Promise<IWorkout[]>,
    loadById: (id: string) => Promise<IWorkout | null>,
    remove: (id: string) => Promise<void>,
}
