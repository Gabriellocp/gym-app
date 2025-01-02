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