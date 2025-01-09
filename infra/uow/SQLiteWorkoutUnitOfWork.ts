import { IExerciseRepository } from "@/domain/interfaces/repositories/IExerciseRepository";
import { IWorkoutRepository } from "@/domain/interfaces/repositories/IWorkoutRepository";
import { SQLiteDatabase } from "expo-sqlite";
import { IWorkoutUnitOfWork } from "../../application/interfaces/unit-of-work/IWorkoutUnitOfWork";
import BaseUOW from "../../application/uow/BaseUOW";

class SQLiteWorkoutUnitOfWork extends BaseUOW<SQLiteDatabase> implements IWorkoutUnitOfWork {
    private workoutRepo?: IWorkoutRepository
    private exerciseRepo?: IExerciseRepository

    constructor(protected db: SQLiteDatabase) {
        super(db)
    }
    // setRepos = (workout: IWorkoutRepository, exercise: IExerciseRepository) => {
    //     this.workoutRepo = workout;
    //     this.exerciseRepo = exercise
    // };

    begin = async () => {
        await this.db.execAsync('BEGIN')
    };
    commit = async () => {
        await this.db.execAsync('COMMIT')

    };
    rollback = async () => {
        await this.db.execAsync('ROLLBACK')

    };
}

export default SQLiteWorkoutUnitOfWork