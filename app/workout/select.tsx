import DefaultButton from "@/components/Button";
import ContentView from "@/components/ContentView";
import WorkoutItemList from "@/components/WorkoutItemList";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function StartWorkout() {
  const [workouts, setWorkouts] = useState([
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
    { name: "teste" },
  ]);
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
