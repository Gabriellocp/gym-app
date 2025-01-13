import { IExerciseHistoryRepository } from "@/domain/interfaces/repositories/IExerciseHistoryRepository";
import { ExerciseHistory } from "@/domain/models";
import { SQLiteDatabase } from "expo-sqlite";

class SQLExerciseHistoryRepository implements IExerciseHistoryRepository {
    constructor(private db: SQLiteDatabase) {

    }
    save = async (model: ExerciseHistory) => {
        await this.db.runAsync(`
                INSERT INTO ExerciseHistory
                (name,sets,setsDone,interval,observation,status,history_id)
                VALUES (?,?,?,?,?,?,?)
            `, [
            model.name,
            model.sets,
            model.currentSet,
            model.interval,
            model.observation ?? null,
            model.status,
            model.history_id,
        ])
        return model
    };
    getAll = async () => {
        return await this.db.getAllAsync<ExerciseHistory>(`
            SELECT * FROM ExerciseHistory
            `)
    };
    getById = async (id: string) => {
        return await this.db.getFirstAsync<ExerciseHistory>(`
            SELECT * FROM ExerciseHistory WHERE id = '${id}'
            `)
    };
    delete = async (id: string) => {
        const r = await this.db.runAsync(`
            DELETE FROM ExerciseHistory WHERE id = '${id}'
            `)

        return !!r.changes
    };
    getByHistoryId = async (id: number) => {
        return await this.db.getAllAsync<ExerciseHistory>(`
            SELECT * FROM ExerciseHistory
            WHERE history_id = '${id}'
            `)
    }
}

export default SQLExerciseHistoryRepository