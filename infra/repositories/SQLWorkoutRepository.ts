import { SQLiteDatabase } from 'expo-sqlite';
import { IWorkoutRepository } from '../../domain/interfaces/repositories/IWorkoutRepository';
import { Workout } from '../../domain/models';

class SQLWorkoutRepository implements IWorkoutRepository {
    constructor(private db: SQLiteDatabase) {

    }

    save = async (model: Workout) => {
        this.db.runAsync(`
                INSERT INTO Workouts 
                (name) VALUES (?)
        `, [model.name])
        return model
    };

    getAll = async () => {
        return await this.db.getAllAsync<Workout>(`
            SELECT * FROM Workouts
            `)
    };
    getById = async (id: string) => {
        return await this.db.getFirstAsync<Workout>(`
            SELECT * FROM Workouts
            WHERE name = '${id}'
            `)
    };
    delete = async (id: string) => {
        const result = await this.db.runAsync(`
            DELETE FROM Workouts WHERE name = '${id}'
            `)
        return !!result.changes
    };


}

export default SQLWorkoutRepository