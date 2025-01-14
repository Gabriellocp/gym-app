import { DefaultColors } from "@/constants/Colors";
import { Exercise } from "@/domain/models";
import { Text, View } from "react-native";
import DefaultButton from "./Button";

type ExerciseItemListProps = {
  exercise: Exercise;
  onRemove: (ex: Exercise) => void;
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
          fontSize: 16,
          flex: 1,
          fontWeight: "bold",
          textTransform: "uppercase",
          color: DefaultColors.accentText,
        }}
      >
        {exercise.name}
      </Text>
      <DefaultButton
        title="Remover"
        onPress={() => onRemove(exercise)}
        variant="error"
      />
    </View>
  );
}
