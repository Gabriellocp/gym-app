import { DefaultColors } from "@/constants/Colors";
import { IExercise } from "@/infra/models";
import { Text, View } from "react-native";
import DefaultButton from "./Button";

type ExerciseItemListProps = {
  exercise: IExercise;
  onRemove: (ex: IExercise) => void;
};

export default function ExerciseItemList({
  exercise,
  onRemove,
}: ExerciseItemListProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 16,
        backgroundColor: DefaultColors.primary,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          flex: 1,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {exercise.name}
      </Text>
      <DefaultButton title="Remover" onPress={() => onRemove(exercise)} />
    </View>
  );
}
