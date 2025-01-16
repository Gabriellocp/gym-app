import { Workout } from "@/domain/models";

export interface IWorkoutService<T = any> {
    save: (workout: Workout) => Promise<T | undefined>,
    loadAll: () => Promise<Workout[]>,
    loadById: (id: string) => Promise<Workout | null>,
    remove: (id: string) => Promise<void>,
    update: (workout: Workout) => Promise<void>
}
