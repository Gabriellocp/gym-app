import * as SQLite from 'expo-sqlite';
import { IDatabase } from '../interfaces/database/IDatabase';

class SQLiteRepository implements IDatabase {
    db: SQLite.SQLiteDatabase | undefined
    public connect = async (dbName: string) => {
        while (!this.db) {
            try {
                this.db = await SQLite.openDatabaseAsync(dbName)
                await this.db!.execAsync(`
                    PRAGMA journal_mode = WAL;
                    PRAGMA foreign_keys = ON;
                    CREATE TABLE IF NOT EXISTS Workouts (
                        name TEXT PRIMARY KEY NOT NULL 
                        );
                    CREATE TABLE IF NOT EXISTS Exercises (
                        name TEXT PRIMARY KEY NOT NULL, 
                        sets INTEGER NOT NULL,
                        interval INTEGER NOT NULL,
                        observation TEXT,
                        workout_id TEXT NOT NULL,
                        reps INTEGER NOT NULL,
                        FOREIGN KEY (workout_id) REFERENCES Workouts(name)  ON DELETE CASCADE
                        );
                    CREATE TABLE IF NOT EXISTS WorkoutHistory (
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                    name TEXT NOT NULL, 
                    completedExercises INTEGER NOT NULL,
                    status TEXT NOT NULL,
                    startAt DATE NOT NULL,
                    finishAt DATE NOT NULL,
                    createdAt DATE NOT NULL
                    );
                CREATE TABLE IF NOT EXISTS ExerciseHistory (
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                    name NOT NULL, 
                    sets INTEGER NOT NULL,
                    interval INTEGER NOT NULL,
                    observation TEXT,
                    setsDone INTEGER NOT NULL,
                    status TEXT NOT NULL,
                    reps INTEGER NOT NULL,
                    history_id INTEGER NOT NULL,
                    FOREIGN KEY (history_id) REFERENCES WorkoutHistory(id)  ON DELETE CASCADE
                    );
                    `);
                // this.db.execAsync(`
                //         DROP TABLE WorkoutHistory;
                //         DROP TABLE Workouts;
                //         DROP TABLE Exercises;
                //         DROP TABLE ExerciseHistory;
                //         `)
            } catch (err) {
                console.log(err)
                throw new Error('Db connection failed')
            }
        }

    };
}


export default SQLiteRepository