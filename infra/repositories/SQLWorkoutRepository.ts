import { SQLiteDatabase } from 'expo-sqlite';
import { IWorkoutRepository } from '../../domain/interfaces/repositories/IWorkoutRepository';
import { Workout } from '../../domain/models';

class SQLWorkoutRepository implements IWorkoutRepository {
    constructor(private db: SQLiteDatabase) {

    }

    save = async (model: Workout) => {
        const r = await this.db.runAsync(`
                INSERT INTO Workouts 
                (name) VALUES (?)
        `, [model.name])
        console.log('ID GERADO', r.lastInsertRowId.toString())
        return { ...model, id: r.lastInsertRowId.toString() }
    };

    getAll = async () => {
        return await this.db.getAllAsync<Workout>(`
            SELECT * FROM Workouts
            `)
    };
    getById = async (id: string) => {
        return await this.db.getFirstAsync<Workout>(`
            SELECT * FROM Workouts
            WHERE id = '${id}'
            `)
    };
    delete = async (id: string) => {
        const result = await this.db.runAsync(`
            DELETE FROM Workouts WHERE id = '${id}'
            `)
        return !!result.changes
    };


}

export default SQLWorkoutRepository