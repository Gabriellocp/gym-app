import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import WorkoutExercise from "@/components/WorkoutExercise";
import { useWorkoutContext } from "@/components/WorkoutProvider";
import useExitConfirm from "@/hooks/useExitConfirm";
import { ActiveExercise, ActiveWorkout, Workout } from "@/domain/models";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { DefaultColors } from "@/constants/Colors";

export default function StartWorkout() {
  const { id } = useLocalSearchParams();
  const {
    loadById,
    start,
    select,
    workoutStatus,
    finishWorkout,
    resetWorkout,
    canFinishWorkout,
  } = useWorkoutContext();

  const [workout, setWorkout] = useState<ActiveWorkout>({
    id: "",
    exercises: [],
    name: "",
    startAt: new Date(),
    status: "UNDONE",
  });
  const navigation = useNavigation();
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
    return () => {
      if (canFinishWorkout()) {
        resetWorkout();
      }
    };
  }, [id]);

  const handleUpdateExercise = (exercise?: ActiveExercise | null) => {
    if (!exercise) {
      return;
    }
    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises].map((e) => {
        if (e.id === exercise.id) {
          return exercise;
        }
        return e;
      }),
    }));
  };
  const handleFinishWorkout = async () => {
    const finishedWorkout = await finishWorkout();
    // setWorkout(finishedWorkout);
    navigation.goBack();
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
      <Text
        style={{ fontSize: 24, textAlign: "center", color: DefaultColors.text }}
      >
        {workout.name}
      </Text>
      <FlatList
        style={{ marginTop: 24 }}
        data={workout?.exercises}
        ItemSeparatorComponent={() => <View style={{ height: 24 }}></View>}
        renderItem={({ item }) => (
          <WorkoutExercise
            key={item.id}
            exercise={item}
            status={item.status}
            canPlay={workoutStatus() !== "UNDONE"}
            onControl={(exercise) => {
              handleUpdateExercise(exercise);
              setWorkout((prev) => ({
                ...prev,
                status: workoutStatus(),
              }));
            }}
          />
        )}
      ></FlatList>
      {workoutStatus() === "UNDONE" && (
        <DefaultButton title="Iniciar" onPress={handleStartWorkout} center />
      )}
      {workoutStatus() === "ACTIVE" && (
        <DefaultButton
          title="Finalizar"
          variant="error"
          center
          disabled={!canFinishWorkout()}
          onPress={handleFinishWorkout}
        />
      )}
    </ContentView>
  );
}
