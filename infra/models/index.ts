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

export type IActiveExercise = (IExercise & {
    // currentSet: number,
    status: IStatus,
})

export type IActiveWorkout = {
    name: string,
    timeSpent: number,
    status?: IStatus
    exercises: IActiveExercise[],
}