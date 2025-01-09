import { ILocalStorageService } from "../../domain/interfaces/services/ILocalStorageService";
import { IStorageService } from "../../domain/interfaces/services/IStorageService";
import { ActiveWorkout } from "../../domain/models";
import LocalStorageService from "./LocalStorageService";
class WorkoutLocalControlService implements IStorageService<ActiveWorkout> {
    private storage: ILocalStorageService<ActiveWorkout> = new LocalStorageService()

    save = async (data: ActiveWorkout) => {
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