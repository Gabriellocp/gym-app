import { IActiveWorkout } from "../models";
import { ILocalStorageService } from "./interfaces/ILocalStorageService";
import { IStorageService } from "./interfaces/IStorageService";
import LocalStorageService from "./LocalStorageService";
class WorkoutLocalControlService implements IStorageService<IActiveWorkout> {
    private storage: ILocalStorageService<IActiveWorkout> = new LocalStorageService()

    save = async (data: IActiveWorkout) => {
        try {
            this.storage.save('activeWorkout', data)
        } catch (err) {

        }
    };
    load = async () => {
        try {
            const workout = await this.storage.load('activeWorkout')
            return workout
        } catch (err) {
            return []
        }
    };

    remove = async () => {
        try {
            this.storage.remove('activeWorkout')
        } catch (err) {

        }
    }

}

export default new WorkoutLocalControlService()