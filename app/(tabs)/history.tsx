import ContentView from "@/components/ContentView";
import HistoryCard from "@/components/HistoryCard";
import { useServiceContext } from "@/components/ServiceProvider";
import { WorkoutHistory } from "@/domain/models";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function History() {
  const { historyService } = useServiceContext();
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        setHistory((await historyService?.getHistory()) ?? []);
      };
      fetchHistory();
    }, [])
  );
  return (
    <ContentView>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        data={history}
        renderItem={({ item }) => {
          return <HistoryCard history={item} />;
        }}
      ></FlatList>
    </ContentView>
  );
}
