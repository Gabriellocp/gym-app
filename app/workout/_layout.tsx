import ExerciseProvider from "@/components/ExerciseProvider";
import WorkoutProvider from "@/components/WorkoutProvider";
import WorkoutService from "@/infra/services/WorkoutService";
import { Stack } from "expo-router";

export default function WorkoutLayout() {
  const service = new WorkoutService();
  return (
    <WorkoutProvider service={service}>
      <ExerciseProvider>
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
      </ExerciseProvider>
    </WorkoutProvider>
  );
}
