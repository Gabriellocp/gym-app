import { IActiveExercise, IActiveWorkout, IExercise, IStatus, IWorkout } from "../../models";
export interface IWorkoutControlService {
    // workout?: Omit<IActiveWorkout, 'exercise'>
    // activeExercise?: IActiveWorkout['exercise']
    // storage: IStorageService,
    start: (workout: IWorkout) => Promise<IActiveWorkout>,
    startSet: (exercise: IExercise, status?: IStatus) => (IActiveExercise) | null | undefined
    pauseSet: () => (IActiveExercise) | null | undefined,
    resumeSet: () => (IActiveExercise) | null | undefined,
    finishSet: () => (IActiveExercise) | null | undefined,
}