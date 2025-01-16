import { ILocalStorageService } from "../../domain/interfaces/services/ILocalStorageService";
import { IStorageService } from "../../domain/interfaces/services/IStorageService";
import { Workout } from "../../domain/models";
import LocalStorageService from "./LocalStorageService";
class WorkoutLocalStorageService implements IStorageService<Workout> {
    private storage: ILocalStorageService<Workout[]> = new LocalStorageService()

    save = async (data: Workout) => {
        try {
            const currentData = await this.storage.load('workouts') ?? []
            this.storage.save('workouts', [...currentData, data])
        } catch (err) {

        }
    };
    load = async () => {
        try {
            const workouts = await this.storage.load('workouts') ?? []
            return workouts
        } catch (err) {
            return []
        }
    };

    remove = async (id?: string) => {
        try {
            const workouts = await this.storage.load('workouts') ?? []
            const item = workouts?.find(e => e.id === id)
            if (!item) {
                return
            }
            this.storage.save('workouts', workouts.filter(e => e.id !== id))
        } catch (err) {

        }
    }

}

export default new WorkoutLocalStorageService()