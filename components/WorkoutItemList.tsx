import { Text, View } from "react-native";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";
import useModal from "@/hooks/useModal";
import ConfirmationModal from "./ConfirmationModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { router, useNavigation } from "expo-router";
import { Workout } from "@/domain/models";

type WorkoutItemListProps = {
  workout: Workout;
  onPress: () => void;
  onRemove: () => void;
};

export default function WorkoutItemList({
  workout,
  onPress,
  onRemove,
}: WorkoutItemListProps) {
  const { isVisible, toggle } = useModal();
  const { showActionSheetWithOptions } = useActionSheet();
  const handleActions = () =>
    showActionSheetWithOptions(
      {
        options: ["Deletar", "Atualizar", "Cancelar"],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 2,
        showSeparators: true,
        destructiveColor: DefaultColors.error,
        cancelButtonTintColor: DefaultColors.accent,
        title: workout.name,
        containerStyle: {
          borderRadius: 16,
          width: 280,
          alignSelf: "center",
        },
      },
      (i?: number) => {
        switch (i) {
          case 0:
            toggle();
            break;
          case 1:
            router.push("/workout/create");
            router.setParams({ id: workout.id });
            break;
        }
      }
    );

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
          color: DefaultColors.accentText,
        }}
      >
        {workout.name}
      </Text>
      <Ionicons
        name="ellipsis-vertical"
        size={24}
        color={DefaultColors.accentText}
        style={{ position: "absolute", right: 8, top: 8 }}
        onPress={handleActions}
      />
      <View style={{ flex: 1, flexDirection: "row", marginTop: 16, gap: 16 }}>
        {/* <DefaultButton title="Deletar" variant="error" onPress={toggle} /> */}
        <DefaultButton title="Começar" onPress={onPress} variant="secondary" />
      </View>
    </View>
  );
}
