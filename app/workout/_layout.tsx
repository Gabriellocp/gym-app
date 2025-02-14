import ExerciseProvider from "@/components/ExerciseProvider";
import { useRepositoryContext } from "@/components/RepositoryProvider";
import WorkoutProvider from "@/components/WorkoutProvider";
import SQLiteRepository from "@/infra/database/SQLiteDatabase";
import ExerciseRepository from "@/infra/repositories/SQLExerciseRepository";
import WorkoutRepository from "@/infra/repositories/SQLWorkoutRepository";
import WorkoutControlService from "@/application/services/WorkoutControlService";
import WorkoutLocalControlService from "@/application/services/WorkoutLocalControlService";
import WorkoutService from "@/application/services/WorkoutService";
import { Link, RelativePathString, Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useMemo } from "react";
import { useServiceContext } from "@/components/ServiceProvider";
import Header from "@/components/Header";
import { DefaultColors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Touchable, TouchableOpacity } from "react-native";

export default function WorkoutLayout() {
  const { workoutControlService, workoutService } = useServiceContext();

  return (
    <WorkoutProvider service={workoutService!} control={workoutControlService!}>
      <ExerciseProvider>
        <Stack
          screenOptions={(props) => ({
            headerStyle: {
              backgroundColor: DefaultColors.primary,
            },
            headerTintColor: DefaultColors.accentText,
            headerTitleAlign: "center",
          })}
        >
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
