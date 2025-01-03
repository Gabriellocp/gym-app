import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import WorkoutItemList from "@/components/WorkoutItemList";
import { useWorkoutContext } from "@/components/WorkoutProvider";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";

export default function StartWorkout() {
  const { loadAll, remove, workouts, update } = useWorkoutContext();
  useEffect(() => {
    loadAll();
  }, []);
  const handleRemoveItem = async (name: string) => {
    try {
      await remove(name);
      update((prev) => [...prev].filter((w) => w.name !== name));
    } catch (err) {}
  };
  const handleStartWorkout = (name: string) => {
    router.push({
      pathname: "/workout/start",
      params: { id: name },
    });
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
              onPress={() => handleStartWorkout(item.name)}
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
