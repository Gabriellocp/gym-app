import { IExercise, IWorkout } from "../models"
import { IExerciceService } from "./interfaces/IExerciseService"
import { IStorageService } from "./interfaces/IStorageService"
import WorkoutLocalStorageService from "./WorkoutLocalStorageService"


class ExerciseService implements IExerciceService<IWorkout> {
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
        if (!exercises) {
            return null
        }
        if (typeof exercises === 'object') {
            return exercises as IWorkout
        }
        return (exercises as IWorkout[]).find(e => e.name === id) ?? null
    }
    save = async (workoutName: string, exercises: IExercise[]): Promise<IWorkout> => {
        const addData = {
            name: workoutName,
            exercises
        }
        this.service?.save(addData)
        return addData
    };

    remove = async (workoutName: string): Promise<void> => {
        await this.service?.remove(workoutName)
    }

}

export default ExerciseService