import { IActiveExercise, IActiveWorkout, IExercise, IStatus, IWorkout } from "../../models";
export interface IWorkoutControlService {
    // workout?: Omit<IActiveWorkout, 'exercise'>
    // activeExercise?: IActiveWorkout['exercise']
    // storage: IStorageService,
    getUnfinishedWorkout: () => Promise<IActiveWorkout | null>
    select: (workout: IWorkout) => Promise<IActiveWorkout>,
    start: () => Promise<void>,
    startSet: (exercise: IExercise, status?: IStatus) => (IActiveExercise) | null | undefined
    pauseSet: () => (IActiveExercise) | null | undefined,
    resumeSet: () => (IActiveExercise) | null | undefined,
    finishSet: () => (IActiveExercise) | null | undefined,
    finishWorkout: () => Promise<IActiveWorkout>,
    workoutStatus: (newStatus?: IStatus) => (IStatus),
}