import WorkoutControlService from "@/application/services/WorkoutControlService";
import WorkoutHistoryService from "@/application/services/WorkoutHistoryService";
import WorkoutLocalControlService from "@/application/services/WorkoutLocalControlService";
import WorkoutService from "@/application/services/WorkoutService";
import SQLiteRepository from "@/infra/database/SQLiteDatabase";
import SQLExerciseHistoryRepository from "@/infra/repositories/SQLExerciseHistoryRepository";
import SQLExerciseRepository from "@/infra/repositories/SQLExerciseRepository";
import SQLWorkoutHistoryRepository from "@/infra/repositories/SQLWorkoutHistoryRepository";
import SQLWorkoutRepository from "@/infra/repositories/SQLWorkoutRepository";
import SQLiteWorkoutUnitOfWork from "@/infra/uow/SQLiteWorkoutUnitOfWork";

export function makeDatabase() {
    return new SQLiteRepository()
}

export function makeWorkoutRepo() {
    return new SQLWorkoutRepository(makeDatabase().getDb())
}

export function makeExerciseRepo() {
    return new SQLExerciseRepository(makeDatabase().getDb())
}
export function makeWorkUnit() {
    return new SQLiteWorkoutUnitOfWork(makeDatabase().getDb())
}
export function makeWorkoutService() {
    return new WorkoutService({
        workoutRepo: makeWorkoutRepo(),
        exerciseRepo: makeExerciseRepo(),
        workUnit: makeWorkUnit(),
    })
}

export function makeWorkoutControlService() {
    return new WorkoutControlService({
        storage: makeWorkoutControlStorage(),
        workoutHistoryService: makeWorkoutHistoryService()
    })
}

export function makeWorkoutHistoryService() {
    return new WorkoutHistoryService({
        workUnit: makeWorkUnit(),
        exerciseHistoryRepo: makeExerciseHistoryRepo(),
        workoutHistoryRepo: makeWorkoutHistoryRepo()
    })
}
export function makeWorkoutControlStorage() {
    return WorkoutLocalControlService
}
export function makeWorkoutHistoryRepo() {
    return new SQLWorkoutHistoryRepository(makeDatabase().getDb())

}
export function makeExerciseHistoryRepo() {
    return new SQLExerciseHistoryRepository(makeDatabase().getDb())

}