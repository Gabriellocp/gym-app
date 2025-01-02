import { IExercise, IWorkout } from "../models"
import { IExerciceService } from "./interfaces/IExerciseService"
import { IStorageService } from "./interfaces/IStorageService"
import LocalStorageService from "./LocalStorageSaveService"


class ExerciseService implements IExerciceService {
    private service?: IStorageService<IWorkout[]>
    constructor({ service }: { service?: IStorageService } = { service: new LocalStorageService<IWorkout>() }) {
        this.service = service
    }
    loadAll = async (): Promise<IWorkout[]> => {
        const exercises = await this.service?.load('workouts')
        if (!exercises) {
            return []
        }
        return exercises
    }
    loadById = async (id: string): Promise<IWorkout | null> => {
        const exercises = await this.service?.load('workouts')
        if (!exercises) {
            return null
        }
        return exercises.find(e => e.name === id) ?? null
    }
    save = async (workoutName: string, exercises: IExercise[]): Promise<boolean> => {
        const currentData = await this.loadAll()
        const addData = {
            name: workoutName,
            exercises
        }
        this.service?.save('workouts', [...currentData, addData])
        return true
    };

}

export default ExerciseService