import ExerciseProvider from "@/components/ExerciseProvider";
import WorkoutProvider from "@/components/WorkoutProvider";
import WorkoutControlService from "@/infra/services/WorkoutControlService";
import WorkoutLocalControlService from "@/infra/services/WorkoutLocalControlService";
import WorkoutService from "@/infra/services/WorkoutService";
import { Stack } from "expo-router";
import { useEffect, useMemo } from "react";

export default function WorkoutLayout() {
  const service = new WorkoutService();
  const control = useMemo(
    () => new WorkoutControlService(WorkoutLocalControlService),
    []
  );
  return (
    <WorkoutProvider service={service} control={control}>
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
          <Stack.Screen
            name="start"
            options={{ title: "Iniciar" }}
          ></Stack.Screen>
        </Stack>
      </ExerciseProvider>
    </WorkoutProvider>
  );
}
