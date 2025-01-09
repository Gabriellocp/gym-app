export type Exercise = {
    name: string;
    sets: number;
    interval: number;
    observation?: string;
    workout_id: string;
};
export type Workout = {
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
    name: string,
    startAt: Date,
    finishAt?: Date,
    status: Status
    exercises: ActiveExercise[],
}