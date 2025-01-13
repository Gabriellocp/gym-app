import { DefaultColors } from "@/constants/Colors";
import { ExerciseHistory, WorkoutHistory } from "@/domain/models";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useServiceContext } from "./ServiceProvider";

type HistoryCardProps = {
  history: WorkoutHistory;
};

export default function HistoryCard({ history }: HistoryCardProps) {
  const [visible, setVisible] = useState(false);
  const [exercises, setExercises] = useState<ExerciseHistory[]>([]);
  const { historyService } = useServiceContext();
  useEffect(() => {
    if (!exercises.length) {
      const fetch = async () => {
        if (history.id) {
          setExercises(
            (await historyService?.getExercisesByHistory(
              history.id
            )) as ExerciseHistory[]
          );
        }
      };
      fetch();
    }
  }, []);
  return (
    <View
      style={{
        borderRadius: 4,
        backgroundColor: DefaultColors.accent,
        padding: 16,
      }}
      onTouchEnd={() => setVisible((prev) => !prev)}
    >
      <Text>{history.name}aaa</Text>
      <Text>{history.exercises?.length.toString()}</Text>
      {visible && (
        <>
          <FlatList
            data={exercises}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.name}</Text>
                </View>
              );
            }}
          ></FlatList>
        </>
      )}
    </View>
  );
}
