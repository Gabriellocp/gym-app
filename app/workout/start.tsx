import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import WorkoutExercise from "@/components/WorkoutExercise";
import { useWorkoutContext } from "@/components/WorkoutProvider";
import useExitConfirm from "@/hooks/useExitConfirm";
import {
  ActiveExercise,
  ActiveWorkout,
  Exercise,
  Status,
  Workout,
} from "@/domain/models";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function StartWorkout() {
  const { id } = useLocalSearchParams();
  const {
    loadById,
    start,
    select,
    workoutStatus,
    finishWorkout,
    canFinishWorkout,
  } = useWorkoutContext();

  const [workout, setWorkout] = useState<ActiveWorkout>({
    exercises: [],
    name: "",
    startAt: new Date(),
    status: "UNDONE",
  });
  useExitConfirm({
    message: "O treino será finalizado",
    callback: async () => {
      await finishWorkout();
    },
    condition: !canFinishWorkout(),
  });
  useEffect(() => {
    const fetch = async () => {
      if (!id) {
        return;
      }
      const w = await loadById(id as string);
      if (w) {
        setWorkout(await select(w));
      }
    };
    fetch();
  }, []);

  const handleUpdateExercise = (exercise?: ActiveExercise | null) => {
    if (!exercise) {
      return;
    }
    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises].map((e) => {
        if (e.name === exercise.name) {
          return exercise;
        }
        return e;
      }),
    }));
  };
  const handleStartWorkout = async () => {
    await start();
    setWorkout((prev) => ({
      ...prev,
      status: workoutStatus(),
    }));
  };

  return (
    <ContentView>
      <Text style={{ fontSize: 24, textAlign: "center" }}>{id}</Text>
      <FlatList
        style={{ marginTop: 24 }}
        data={workout?.exercises}
        ItemSeparatorComponent={() => <View style={{ height: 24 }}></View>}
        renderItem={({ item }) => (
          <WorkoutExercise
            key={item.name}
            exercise={item}
            status={item.status}
            canPlay={workoutStatus() !== "UNDONE"}
            onControl={(exercise) => handleUpdateExercise(exercise)}
          />
        )}
      ></FlatList>
      {workoutStatus() === "UNDONE" && (
        <DefaultButton title="Iniciar" onPress={handleStartWorkout} />
      )}
    </ContentView>
  );
}
