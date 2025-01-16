import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import WorkoutItemList from "@/components/WorkoutItemList";
import { useWorkoutContext } from "@/components/WorkoutProvider";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";

export default function StartWorkout() {
  const { loadAll, remove, workouts, getUnfinishedWorkout, finishWorkout } =
    useWorkoutContext();
  useEffect(() => {
    getUnfinishedWorkout().then((w) => {
      if (!!w) {
        Alert.alert(
          "Treino não finalizado",
          `O treino ${w.name} não foi finalizado, deseja voltar?`,
          [
            { text: "Finalizar", onPress: async () => await finishWorkout() },
            {
              text: "Sim",
              onPress: () => {
                handleStartWorkout(w.id!);
              },
            },
          ]
        );
      }
    });
    loadAll();
  }, []);
  const handleRemoveItem = async (id: string) => {
    try {
      await remove(id);
    } catch (err) {}
  };
  const handleStartWorkout = (id: string) => {
    router.push({
      pathname: "/workout/start",
      params: { id: id },
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
              key={item.id}
              workout={item}
              onPress={() => handleStartWorkout(item.id!)}
              onRemove={() => handleRemoveItem(item.id!)}
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
