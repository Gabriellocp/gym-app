import { ActiveExercise, ActiveWorkout, Exercise, Status, Workout } from "../../models";
export interface IWorkoutControlService {
    // workout?: Omit<ActiveWorkout, 'exercise'>
    // activeExercise?: ActiveWorkout['exercise']
    // storage: IStorageService,
    getUnfinishedWorkout: () => Promise<ActiveWorkout | null>
    select: (workout: Workout) => Promise<ActiveWorkout>,
    start: () => Promise<void>,
    startSet: (exercise: Exercise, status?: Status) => (ActiveExercise) | null | undefined
    pauseSet: () => (ActiveExercise) | null | undefined,
    resumeSet: () => (ActiveExercise) | null | undefined,
    finishSet: () => (ActiveExercise) | null | undefined,
    finishWorkout: () => Promise<ActiveWorkout>,
    workoutStatus: (newStatus?: Status) => (Status),
    canFinishWorkout: () => boolean,
}