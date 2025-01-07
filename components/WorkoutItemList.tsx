import { Text, View } from "react-native";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";
import useModal from "@/hooks/useModal";
import ConfirmationModal from "./ConfirmationModal";

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
  const { isVisible, toggle } = useModal();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 8,
        borderRadius: 16,
        backgroundColor: DefaultColors.primary,
      }}
    >
      <ConfirmationModal
        message={`Apagar treino ${workout.name}?`}
        isVisible={isVisible}
        onConfirm={onRemove}
        onCancel={toggle}
      />
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
      <View style={{ flex: 1, flexDirection: "row", marginTop: 16 }}>
        <DefaultButton
          title="Deletar"
          onPress={toggle}
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
    </View>
  );
}
