import { IExerciseHistoryRepository } from "@/domain/interfaces/repositories/IExerciseHistoryRepository";
import { IWorkoutHistoryRepository } from "@/domain/interfaces/repositories/IWorkoutHistoryRepository";
import { IWorkoutHistoryService } from "@/domain/interfaces/services/IWorkoutHistoryService";
import { WorkoutHistory } from "@/domain/models";
import BaseUOW from "../uow/BaseUOW";
type WorkoutHistoryServiceArgs = {
    workoutHistoryRepo: IWorkoutHistoryRepository,
    exerciseHistoryRepo: IExerciseHistoryRepository,
    workUnit: BaseUOW,
}
class WorkoutHistoryService implements IWorkoutHistoryService {
    private workoutHistoryRepo: IWorkoutHistoryRepository
    private exerciseHistoryRepo: IExerciseHistoryRepository
    private workUnit: BaseUOW
    constructor({
        workoutHistoryRepo,
        exerciseHistoryRepo,
        workUnit
    }: WorkoutHistoryServiceArgs) {
        this.workUnit = workUnit
        this.workoutHistoryRepo = workoutHistoryRepo
        this.exerciseHistoryRepo = exerciseHistoryRepo
        this.workUnit.addRepo<IWorkoutHistoryRepository>(workoutHistoryRepo, 'workoutHistory')
        this.workUnit.addRepo<IExerciseHistoryRepository>(exerciseHistoryRepo, 'exerciseHistory')

    }
    add = async (model: WorkoutHistory) => {
        try {
            await this.workUnit.begin()
            const history = await this.workUnit.getRepo<IWorkoutHistoryRepository>('workoutHistory').save(model)
            console.log('history id', model.exercises)
            await Promise.all(model.exercises.map(async x => await this.workUnit.getRepo<IExerciseHistoryRepository>('exerciseHistory').save({
                ...x,
                history_id: history!.id!,
            })))
            await this.workUnit.commit()
        } catch (err) {
            console.log(err)
            await this.workUnit.rollback()
        }
    };
    getHistory = async () => {
        return this.workoutHistoryRepo.getAll()
    };
    getExercisesByHistory = async (id: number) => {
        try {

            return await this.exerciseHistoryRepo.getByHistoryId(id)
        } catch (err) {
            console.log(err)
            return []
        }
    };


}

export default WorkoutHistoryService