import CreateExerciseProvider from "@/components/CreateExerciseProvider";
import { Stack } from "expo-router";

export default function WorkoutLayout() {
  return (
    <CreateExerciseProvider>
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
