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
        const exercises = await this.exerciseRepo?.getExercises(workout.name) ?? []
        return {
            name: workout.name,
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
                workout_id: workout.name
            })))
            await this.workUnit?.commit()
            return createdWorkout
        } catch (err) {
            await this.workUnit?.rollback()
            console.log('ERRO', err)
            throw new Error(`Failed to save workout. ERROR: ${err}`)
        }
    };

    remove = async (workoutName: string): Promise<void> => {
        await this.workoutRepo?.delete(workoutName)
    }

}

export default WorkoutService