import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import { useExerciseContext } from "@/components/ExerciseProvider";
import WorkoutItemList from "@/components/WorkoutItemList";
import { IWorkout } from "@/infra/models";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function StartWorkout() {
  const { loadAll, remove } = useExerciseContext();
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  useEffect(() => {
    const fetch = async () => {
      console.log(await loadAll());
      setWorkouts(await loadAll());
    };
    fetch();
  }, []);
  const handleRemoveItem = async (name: string) => {
    try {
      await remove(name);
      setWorkouts((prev) => [...prev].filter((w) => w.name !== name));
    } catch (err) {}
  };
  return (
    <ContentView>
      <FlatList
        style={{ marginBottom: 8, flex: 1 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
        data={workouts}
        renderItem={({ item }) => {
          return (
            <WorkoutItemList
              key={item.name}
              workout={item}
              onPress={() => console.log("Workout")}
              onRemove={() => handleRemoveItem(item.name)}
            />
          );
        }}
      ></FlatList>
      <Link href={"/workout/create"} asChild>
        <DefaultButton
          title="Novo"
          style={{ container: { alignSelf: "center" } }}
        />
      </Link>
    </ContentView>
  );
}
