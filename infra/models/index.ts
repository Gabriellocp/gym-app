export type IExercise = {
    name: string;
    sets: number;
    interval: number;
    observation?: string;
};
export type IWorkout = {
    name: string;
    exercises: IExercise[]
};
export type IStatus = 'ACTIVE' | 'PAUSED' | 'FINISHED' | 'UNDONE'
export type IExerciseStatus = 'DOING' | 'INTERVAL' | 'FINISHED' | 'UNDONE'

export type IActiveExercise = (IExercise & {
    currentSet: number,
    status: IExerciseStatus,
})

export type IActiveWorkout = {
    name: string,
    startAt: Date,
    finishAt?: Date,
    status: IStatus
    exercises: IActiveExercise[],
}