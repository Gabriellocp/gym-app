import { IWorkoutHistoryRepository } from "@/domain/interfaces/repositories/IWorkoutHistoryRepository";
import { WorkoutHistory } from "@/domain/models";
import { SQLiteDatabase } from "expo-sqlite";

class SQLWorkoutHistoryRepository implements IWorkoutHistoryRepository {
    constructor(private db: SQLiteDatabase) {

    }
    save = async (model: WorkoutHistory) => {
        const inserted = await this.db.runAsync(`
                INSERT INTO WorkoutHistory
                (name,startAt,completedExercises,createdAt,status,finishAt)
                VALUES (?,?,?,?,?,?)
            `, [
            model.name,
            model.startAt.toString(),
            model.completedExercises,
            model.createdAt.toString(),
            model.status,
            model.finishAt?.toString() ?? null,
        ])
        return { ...model, id: inserted.lastInsertRowId } as WorkoutHistory
    };
    getAll = async () => {
        return await this.db.getAllAsync<WorkoutHistory>(`
            SELECT * FROM WorkoutHistory
            ORDER BY createdAt DESC

            `)
    };
    getById = async (id: string) => {
        console.log(await this.db.getAllAsync<WorkoutHistory>(`
            SELECT WorkoutHistory.*, ExerciseHistory.* 
             FROM WorkoutHistory
             JOIN ExerciseHistory ON ExerciseHistory.history_id = WorkoutHistory.id
             WHERE WorkoutHistory.id = '${id}'
             `))
        return await this.db.getFirstAsync<WorkoutHistory>(`
            SELECT * FROM WorkoutHistory WHERE id = '${id}'
            `)
    };
    delete = async (id: string) => {
        const r = await this.db.runAsync(`
            DELETE FROM WorkoutHistory WHERE id = '${id}'
            `)

        return !!r.changes
    };

}

export default SQLWorkoutHistoryRepository