import { SQLiteDatabase } from "expo-sqlite";
import { IExerciseRepository } from "../../domain/interfaces/repositories/IExerciseRepository";
import { Exercise } from "../../domain/models";

class SQLExerciseRepository implements IExerciseRepository {
    constructor(private db: SQLiteDatabase) {
    }
    save = async (model: Exercise) => {
        if (!model.workout_id) {
            throw new Error('Exercise must have a workout_id')
        }
        await this.db.runAsync(`
            INSERT INTO Exercises
            (name, interval, sets, observation, workout_id)
            VALUES (?,?,?,?,?)
            `, [model.name, model.interval, model.sets, model.observation ?? null, model.workout_id])
        return model
    };
    getExercises = async (workoutId: string) => {
        console.log(await this.db.getAllAsync<Exercise>(`
            SELECT * FROM Exercises 
            `))
        // WHERE workout_id = '${workoutId}'
        return await this.db.getAllAsync<Exercise>(`
                SELECT * FROM Exercises 
                WHERE workout_id = '${workoutId}'
                `)
    }
    getAll = async () => {
        return await this.db.getAllAsync<Exercise>(`
            SELECT * FROM Exercises
            `)
    };
    getById = async (id: string) => {
        return this.db.getFirstAsync<Exercise>(`
            SELECT * FROM Exercises WHERE name = '${id}'
            `)
    };
    delete = async (id: string) => {
        const result = await this.db.runAsync(`
            DELETE FROM Exercises WHERE name = '${id}'
            `)
        return !!result.changes
    };

}

export default SQLExerciseRepository