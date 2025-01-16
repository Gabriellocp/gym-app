import { IExerciseRepository } from "@/domain/interfaces/repositories/IExerciseRepository"
import { IWorkoutRepository } from "@/domain/interfaces/repositories/IWorkoutRepository"
import { IWorkoutService } from "../../domain/interfaces/services/IWorkoutService"
import { Workout } from "../../domain/models"
import BaseUOW from "../uow/BaseUOW"

type WorkoutServiceArgs = {
    workoutRepo?: IWorkoutRepository
    exerciseRepo?: IExerciseRepository
    workUnit?: BaseUOW
}

class WorkoutService implements IWorkoutService<Workout> {
    private workoutRepo?: IWorkoutRepository
    private exerciseRepo?: IExerciseRepository
    private workUnit?: BaseUOW
    constructor({ workoutRepo, exerciseRepo, workUnit }: WorkoutServiceArgs) {
        this.workoutRepo = workoutRepo
        this.exerciseRepo = exerciseRepo
        this.workUnit = workUnit

        workUnit?.addRepo(workoutRepo, 'workoutRepo')
        workUnit?.addRepo(exerciseRepo, 'exerciseRepo')
    }

    loadAll = async (): Promise<Workout[]> => {
        const workouts = await this.workoutRepo?.getAll() ?? []
        return workouts
    }
    loadById = async (id: string): Promise<Workout | null> => {
        const workout = await this.workoutRepo?.getById(id)
        if (!workout) {
            return null
        }
        const exercises = await this.exerciseRepo?.getExercises(workout.id!) ?? []
        return {
            name: workout.name,
            id: workout.id,
            exercises
        }
    }
    save = async (workout: Workout): Promise<Workout | undefined> => {
        try {
            await this.workUnit?.begin()
            if (!workout.name) {
                throw new Error('Workout must have a name')
            }
            if (!workout.exercises.length) {
                throw new Error('Workout must have at least one exercise')
            }
            const createdWorkout = await this.workUnit?.getRepo<IWorkoutRepository>('workoutRepo').save(workout)
            await Promise.all(workout.exercises.map(async (x) => await this.workUnit?.getRepo<IExerciseRepository>('exerciseRepo').save({
                ...x,
                workout_id: createdWorkout?.id!
            })))
            await this.workUnit?.commit()
            return createdWorkout
        } catch (err) {
            await this.workUnit?.rollback()
            console.log('ERRO', err)
            throw new Error(`Failed to save workout. ERROR: ${err}`)
        }
    };

    remove = async (id: string): Promise<void> => {
        try {

            await this.workoutRepo?.delete(id)
        } catch (err) {
            console.log(err)
        }
    }
    update = async (workout: Workout): Promise<void> => {
        try {
            await this.workUnit?.begin()
            if (!workout.id) {
                throw new Error('Workout not found, please provide a valid id')
            }
            const exerciseRepo = this.workUnit?.getRepo<IExerciseRepository>('exerciseRepo')
            const existingExercises = await exerciseRepo?.getExercises(workout.id) ?? []

            const toCreate = workout.exercises.filter(e => !e.id)
            const toUpdate = existingExercises.filter(e => workout.exercises.find(x => x.id === e.id))
            const toDelete = existingExercises.filter(e => !workout.exercises.find(x => x.id === e.id))
            await Promise.all([
                ...toCreate.map(async x => await exerciseRepo?.save({ ...x, workout_id: workout.id! })),
                ...toUpdate.map(async x => await exerciseRepo?.update(x)),
                ...toDelete.map(async x => await exerciseRepo?.delete(x.id)),
            ])

            await this.workUnit?.commit()
        } catch (err) {
            await this.workUnit?.rollback()

        }
    }

}

export default WorkoutService