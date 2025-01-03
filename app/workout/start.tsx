import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import WorkoutExercise from "@/components/WorkoutExercise";
import { useWorkoutContext } from "@/components/WorkoutProvider";
import {
  IActiveExercise,
  IActiveWorkout,
  IExercise,
  IStatus,
  IWorkout,
} from "@/infra/models";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function StartWorkout() {
  const { id } = useLocalSearchParams();
  const [workout, setWorkout] = useState<IActiveWorkout>({
    exercises: [],
    name: "",
    timeSpent: 0,
  });
  const { loadById, start } = useWorkoutContext();
  useEffect(() => {
    const fetch = async () => {
      if (!id) {
        return;
      }
      const w = await loadById(id as string);
      if (w) {
        setWorkout(await start(w));
      }
    };
    fetch();
  }, []);
  const handleUpdateExercise = (exercise?: IActiveExercise | null) => {
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
            onStatusChanged={(exercise) => handleUpdateExercise(exercise)}
          />
        )}
      ></FlatList>
    </ContentView>
  );
}
