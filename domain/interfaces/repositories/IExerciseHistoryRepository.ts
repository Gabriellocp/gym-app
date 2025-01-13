import { ExerciseHistory } from "@/domain/models";
import { IRepository } from "./IRepository";

export interface IExerciseHistoryRepository extends IRepository<ExerciseHistory> {
    getByHistoryId: (id: number) => Promise<ExerciseHistory[]>
}