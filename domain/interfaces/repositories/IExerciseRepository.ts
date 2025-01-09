import { Exercise } from "@/domain/models";
import { IRepository } from "./IRepository";

export interface IExerciseRepository extends IRepository<Exercise> {
    getExercises: (workoutId: string) => Promise<Exercise[]>
}