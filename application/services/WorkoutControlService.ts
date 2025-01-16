import { IWorkoutControlService } from "@/domain/interfaces/services/IWorkoutControlService";
import { IWorkoutHistoryService } from "@/domain/interfaces/services/IWorkoutHistoryService";
import { IStorageService } from "../../domain/interfaces/services/IStorageService";
import { ActiveExercise, ActiveWorkout, Exercise, Status, Workout } from "../../domain/models";
type WorkoutControlServiceArgs = {
    storage: IStorageService<ActiveWorkout>
    workoutHistoryService: IWorkoutHistoryService
}
class WorkoutControlService implements IWorkoutControlService {
    workout?: ActiveWorkout | null;
    activeExercise?: ActiveExercise | null;
    private storage: IStorageService<ActiveWorkout>
    private workoutHistoryService: IWorkoutHistoryService
    constructor({ storage, workoutHistoryService }: WorkoutControlServiceArgs) {
        this.storage = storage
        this.workoutHistoryService = workoutHistoryService
    }
    private saveExercise = (exercise: ActiveExercise) => {
        this.activeExercise = exercise
        this.workout!.exercises = this.workout!.exercises.map(ex => {
            if (ex.id === this.activeExercise?.id) {
                return this.activeExercise
            }
            return ex
        })
    }
    private setWorkoutInitialState = (workout: Workout): ActiveWorkout => {
        return ({
            id: workout.id,
            startAt: new Date(),
            name: workout.name,
            status: 'UNDONE',
            exercises: workout.exercises.map(e => ({ ...e, status: 'UNDONE', currentSet: 1 }))
        }) as ActiveWorkout
    }
    private saveStorage = () => {
        if (!this.workout) {
            return
        }
        this.storage.save(this.workout)
    }
    getUnfinishedWorkout = async () => {
        const unfinishedWorkout = await this.storage.load()
        if (!unfinishedWorkout || ['FINISHED', 'UNDONE'].includes((unfinishedWorkout as ActiveWorkout).status)) {
            return null
        }
        this.workout = unfinishedWorkout as ActiveWorkout
        this.activeExercise = this.workout.exercises.find(e => ['DOING', 'INTERVAL'].includes(e.status))
        return this.workout
    }
    select = async (workout: Workout) => {
        // TODO: refactor this code and remove select responsiblity of checking existing workout
        if (this.workout) {
            return this.workout
        }
        this.workout = this.setWorkoutInitialState(workout)
        this.activeExercise = null
        return this.workout

    };
    start = async () => {

        if (!this.workout) {
            return
        }
        this.workout.status = 'STARTED'
    };
    startSet = (exercise: Exercise) => {
        if (!this.workout) {
            return null
        }
        this.workout.status = 'ACTIVE'
        const selected = this.workout.exercises.find(e => e.id === exercise.id)
        if (selected?.id !== this.activeExercise?.id
            && !!this.activeExercise
            && this.activeExercise?.status !== "FINISHED"
        ) {
            return this.activeExercise
        }
        this.saveExercise({ ...exercise, status: 'DOING', currentSet: 1 })

        this.saveStorage()
        return this.activeExercise
    };
    pauseSet = () => {
        if (!this.activeExercise) {
            return
        }
        this.saveExercise({
            ...this.activeExercise,
            status: 'INTERVAL'
        })
        this.saveStorage()
        return this.activeExercise
    };
    finishSet = () => {
        if (!this.activeExercise) {
            return
        }
        this.saveExercise({
            ...this.activeExercise,
            status: 'FINISHED'
        })
        this.saveStorage()
        return this.activeExercise

    };

    canFinishWorkout = () => {
        if (!this.workout) {
            return true
        }
        // can finish workout without any issues
        const canFinishStatus = ['STARTED', 'UNDONE', 'FINISHED'].includes(this.workout?.status)
        if (canFinishStatus) {
            return true
        }
        // case where workoutstatus === active
        const allExercisesDone = this.workout.exercises.every(x => x.status === "FINISHED")
        return allExercisesDone
    }
    resumeSet = () => {
        if (!this.activeExercise) {
            return
        }
        this.saveExercise({
            ...this.activeExercise,
            status: 'DOING',
            currentSet: this.activeExercise.currentSet + 1
        })
        this.saveStorage()
        return this.activeExercise

    };
    finishWorkout = async () => {
        if (!this.workout) {
            throw new Error('Workout not found')
        }
        const returnWorkout = this.workout
        try {

            const finishDate = new Date()
            this.workout.finishAt = finishDate
            this.workout.status = 'FINISHED'
            this.saveStorage()
            const { id, ...rest } = this.workout
            await this.workoutHistoryService.add({
                ...rest,
                completedExercises: this.workout.exercises.filter(x => x.status === 'FINISHED').length ?? 0,
                createdAt: new Date(),
            })
            this.resetWorkout()
        } catch (err) {
            console.log(err)
            throw new Error('Error while registering item on history')
        }
        return returnWorkout
    }

    resetWorkout = async () => {
        this.workout = null
        this.activeExercise = null
        // this.workout = this.setWorkoutInitialState(this.workout as Workout)
        await this.storage.remove()

    }
    workoutStatus = (newStatus?: Status) => {
        if (!this.workout) {
            return 'UNDONE'
        }
        if (newStatus) {
            this.workout.status = newStatus
        }
        return this.workout.status
    }



}

export default WorkoutControlService