import { DefaultColors } from "@/constants/Colors";
import { ExerciseHistory, WorkoutHistory } from "@/domain/models";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useServiceContext } from "./ServiceProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import getExerciseStatus from "@/utils/get-exercise-status";

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ flex: 1, fontSize: 20 }}>{history.name}</Text>
          <Text style={{ flex: 1, fontSize: 12 }}>
            {`Feito em ${new Date(history.startAt).toLocaleDateString(
              "pt-br"
            )}`}
          </Text>
        </View>
        <Ionicons name={visible ? "chevron-up" : "chevron-down"} size={18} />
      </View>
      {visible && (
        <>
          <FlatList
            data={exercises}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 16, fontWeight: 500 }}>
                    {item.name}
                  </Text>
                  <Text>{`${getExerciseStatus(item.status)}(${item.setsDone}/${
                    item.sets
                  })`}</Text>
                </View>
              );
            }}
          ></FlatList>
        </>
      )}
    </View>
  );
}
