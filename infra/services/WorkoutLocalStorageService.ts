import { IWorkout } from "../models";
import { ILocalStorageService } from "./interfaces/ILocalStorageService";
import { IStorageService } from "./interfaces/IStorageService";
import LocalStorageService from "./LocalStorageService";
class WorkoutLocalStorageService implements IStorageService<IWorkout> {
    private storage: ILocalStorageService<IWorkout[]> = new LocalStorageService()

    save = async (data: IWorkout) => {
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
            const item = workouts?.find(e => e.name === id)
            if (!item) {
                return
            }
            this.storage.save('workouts', workouts.filter(e => e.name !== id))
        } catch (err) {

        }
    }

}

export default new WorkoutLocalStorageService()