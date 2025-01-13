import { ExerciseStatus } from "@/domain/models";

export default function getExerciseStatus(status: ExerciseStatus) {
    switch (status) {
        case 'UNDONE':
            return 'Não realizado'
        case 'DOING':
            return 'Fazendo'
        case 'FINISHED':
            return 'Finalizado'
        case 'INTERVAL':
            return 'Descanso'
    }
}