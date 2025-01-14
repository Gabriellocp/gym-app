import { Modal, Text, View } from "react-native";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";
import { ReactNode } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type ConfirmationModalProps = {
  icon?: { name: string; color: string; size: number };
  message?: string;
  isVisible: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
};

export default function ConfirmationModal({
  icon = { name: "warning", color: DefaultColors.accent, size: 75 },
  message,
  isVisible,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal visible={isVisible} onRequestClose={onCancel} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,.7)",
        }}
      >
        <View
          style={{
            gap: 16,
            backgroundColor: DefaultColors.background,
            justifyContent: "center",
            alignItems: "center",
            width: 320,
            padding: 8,
            borderRadius: 16,
          }}
        >
          {icon && (
            <Ionicons
              name={"alert-circle"}
              size={icon.size}
              color={icon.color}
            />
          )}
          <Text
            style={{ fontSize: 18, fontWeight: "700", textAlign: "center" }}
          >
            {message ?? "Confirmar ação?"}
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <DefaultButton title="Não" onPress={onCancel} />
            <DefaultButton title="Sim" onPress={onConfirm} variant="error" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
