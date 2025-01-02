import CreateExerciseProvider from "@/components/ExerciseProvider";
import ExerciseService from "@/infra/services/ExerciseService";
import LocalStorageService from "@/infra/services/LocalStorageSaveService";
import { Stack } from "expo-router";

export default function WorkoutLayout() {
  const service = new ExerciseService();
  return (
    <CreateExerciseProvider service={service}>
      <Stack>
        <Stack.Screen
          name="select"
          options={{ title: "Selecionar treino" }}
        ></Stack.Screen>
        <Stack.Screen
          name="create"
          options={{ title: "Novo treino" }}
        ></Stack.Screen>
      </Stack>
    </CreateExerciseProvider>
  );
}
