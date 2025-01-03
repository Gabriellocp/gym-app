import { IWorkout } from "../models"
import { IStorageService } from "./interfaces/IStorageService"
import { IWorkoutService } from "./interfaces/IWorkoutService"
import WorkoutLocalStorageService from "./WorkoutLocalStorageService"


class WorkoutService implements IWorkoutService<IWorkout> {
    private service?: IStorageService<IWorkout>
    constructor({ service }: { service?: IStorageService<IWorkout> } = { service: WorkoutLocalStorageService }) {
        this.service = service
    }

    loadAll = async (): Promise<IWorkout[]> => {
        const exercises = await this.service?.load()

        return exercises as IWorkout[]
    }
    loadById = async (id: string): Promise<IWorkout | null> => {
        const exercises = await this.service?.load()
        console.log(exercises)
        if (!exercises) {
            return null
        }
        if (!Array.isArray(exercises)) {
            return exercises as IWorkout
        }
        return (exercises as IWorkout[]).find(e => e.name === id) ?? null
    }
    save = async (workout: IWorkout): Promise<IWorkout> => {
        // const addData = {
        //     name: workout.,
        //     exercises
        // }
        this.service?.save(workout)
        return workout
    };

    remove = async (workoutName: string): Promise<void> => {
        await this.service?.remove(workoutName)
    }

}

export default WorkoutService