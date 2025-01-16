export type Exercise = {
    id: string,
    name: string;
    sets: number;
    interval: number;
    observation?: string;
    reps: number;
    workout_id: string;
};
export type Workout = {
    id?: string,
    name: string;
    exercises: Exercise[]
};
export type Status = 'ACTIVE' | 'STARTED' | 'FINISHED' | 'UNDONE'
export type ExerciseStatus = 'DOING' | 'INTERVAL' | 'FINISHED' | 'UNDONE'

export type ActiveExercise = (Exercise & {
    currentSet: number,
    status: ExerciseStatus,
})

export type ActiveWorkout = {
    id?: string,
    name: string,
    startAt: Date,
    finishAt?: Date,
    status: Status
    exercises: ActiveExercise[],
}

export type WorkoutHistory = ActiveWorkout & { createdAt: Date, completedExercises: number, id?: string }

export type ExerciseHistory = Omit<ActiveExercise, 'workout_id'> & { history_id: string, setsDone?: number }