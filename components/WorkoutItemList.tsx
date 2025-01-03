import { Text, View } from "react-native";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";

type WorkoutItemListProps = {
  workout: { name: string; count?: number };
  onPress: () => void;
  onRemove: () => void;
};

export default function WorkoutItemList({
  workout,
  onPress,
  onRemove,
}: WorkoutItemListProps) {
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
        {workout.name}
      </Text>
      <DefaultButton
        title="Deletar"
        onPress={onRemove}
        style={{
          container: { height: 20, backgroundColor: DefaultColors.error },
          text: { fontSize: 14, color: DefaultColors.text },
        }}
      />
      <DefaultButton
        title="Começar"
        onPress={onPress}
        style={{
          container: { height: 20 },
          text: { fontSize: 14, color: DefaultColors.text },
        }}
      />
    </View>
  );
}
