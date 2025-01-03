import { IActiveExercise, IActiveWorkout, IExercise, IWorkout } from "../models";
import { IStorageService } from "./interfaces/IStorageService";
import { IWorkoutControlService } from "./interfaces/IWorkoutControlService";

class WorkoutControlService implements IWorkoutControlService {
    workout?: IActiveWorkout | null;
    activeExercise?: IActiveExercise | null;
    private done: IExercise[] = []
    constructor(public storage: IStorageService<IActiveWorkout>) {

    }
    saveStorage = () => {
        if (!this.workout) {
            return
        }
        this.storage.save({ ...this.workout, ...this.activeExercise })
    }

    start = async (workout: IWorkout) => {
        this.workout = {
            name: workout.name,
            status: 'ACTIVE',
            timeSpent: 0,
            exercises: workout.exercises.map(e => ({ ...e, status: 'UNDONE' }))
        }
        this.saveStorage()
        return this.workout

    };
    startSet = (exercise: IExercise) => {
        if (!this.workout) {
            return null
        }
        const selected = this.workout.exercises.find(e => e.name === exercise.name)

        if (selected?.name !== this.activeExercise?.name
            && this.activeExercise !== undefined
            && this.activeExercise?.status !== "FINISHED"
        ) {
            return this.activeExercise
        }
        this.activeExercise = { ...exercise, status: 'ACTIVE' }

        this.saveStorage()
        return this.activeExercise
    };
    pauseSet = () => {
        if (!this.activeExercise) {
            return
        }
        this.activeExercise = {
            ...this.activeExercise,
            status: 'PAUSED'
        }
        this.saveStorage()
        return this.activeExercise
    };
    finishSet = () => {
        if (!this.activeExercise) {
            return
        }
        this.activeExercise = {
            ...this.activeExercise,
            status: 'FINISHED'
        }
        this.saveStorage()
        return this.activeExercise

    };
    resumeSet = () => {
        if (!this.activeExercise) {
            return
        }
        this.activeExercise = {
            ...this.activeExercise,
            status: 'ACTIVE'
        }
        this.saveStorage()
        return this.activeExercise

    };


}

export default WorkoutControlService