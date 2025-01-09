import { IWorkoutHistoryRepository } from "@/domain/interfaces/repositories/IWorkoutHistoryRepository";
import { IWorkoutControlService } from "@/domain/interfaces/services/IWorkoutControlService";
import { IStorageService } from "../../domain/interfaces/services/IStorageService";
import { ActiveExercise, ActiveWorkout, Exercise, Status, Workout } from "../../domain/models";
type WorkoutControlServiceArgs = {
    storage: IStorageService<ActiveWorkout>
    workoutHistoryRepo: IWorkoutHistoryRepository
}
class WorkoutControlService implements IWorkoutControlService {
    workout?: ActiveWorkout | null;
    activeExercise?: ActiveExercise | null;
    private storage: IStorageService<ActiveWorkout>
    private workoutHistoryRepo: IWorkoutHistoryRepository
    constructor({ storage, workoutHistoryRepo }: WorkoutControlServiceArgs) {
        this.storage = storage
        this.workoutHistoryRepo = workoutHistoryRepo
    }
    private saveExercise = (exercise: ActiveExercise) => {
        this.activeExercise = exercise
        this.workout!.exercises = this.workout!.exercises.map(ex => {
            if (ex.name === this.activeExercise?.name) {
                return this.activeExercise
            }
            return ex
        })
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
        if (!this.workout) {
            this.workout = {
                startAt: new Date(),
                name: workout.name,
                status: 'UNDONE',
                exercises: workout.exercises.map(e => ({ ...e, status: 'UNDONE', currentSet: 1 }))
            }
        }
        return this.workout

    };
    start = async () => {

        if (!this.workout) {
            return
        }
        this.workout.status = 'STARTED'
        this.saveStorage()
    };
    startSet = (exercise: Exercise) => {
        if (!this.workout) {
            return null
        }
        this.workout.status = 'ACTIVE'
        console.log('STATUS ALTERADO', this.workout)
        const selected = this.workout.exercises.find(e => e.name === exercise.name)
        if (selected?.name !== this.activeExercise?.name
            && this.activeExercise !== undefined
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
        const allExercisesDone = this.workout?.exercises.every(x => x.status === 'FINISHED') ?? true
        return this.workout?.status !== 'ACTIVE' && allExercisesDone
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
            this.saveStorage()
            if (this.workout.status === 'ACTIVE' || this.workout.status === 'FINISHED') {
                const r = await this.workoutHistoryRepo.save({
                    ...this.workout,
                    completedExercises: this.workout.exercises.filter(x => x.status === 'FINISHED').length ?? 0,
                    createdAt: new Date(),
                })
                console.log(r, `CRIADO O HISTORICO`)
            }
            this.workout = null
            this.storage.remove()
        } catch (err) {
            console.log(err)
            throw new Error('Error while registering item on history')
        }
        return returnWorkout
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