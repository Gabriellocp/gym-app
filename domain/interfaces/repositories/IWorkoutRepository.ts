import { Workout } from "@/domain/models";
import { IRepository } from "./IRepository";

export interface IWorkoutRepository extends IRepository<Workout> {
}