import { IExercise, IWorkout } from "@/infra/models";

export interface IExerciceService {
    save: (workoutName: string, exercises: IExercise[]) => Promise<boolean>,
    loadAll: () => Promise<IWorkout[]>,
    loadById: (id: string) => Promise<IWorkout | null>
}
