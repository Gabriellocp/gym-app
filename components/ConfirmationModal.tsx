import { Modal, Text, View } from "react-native";
import DefaultButton from "./Button";
import { DefaultColors } from "@/constants/Colors";

type ConfirmationModalProps = {
  message?: string;
  isVisible: boolean;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
};

export default function ConfirmationModal({
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
            gap: 32,
            backgroundColor: DefaultColors.background,
            justifyContent: "center",
            width: 320,
            // height: 230,
            padding: 8,
            borderRadius: 16,
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "700", textAlign: "center" }}
          >
            {message ?? "Confirmar ação?"}
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <DefaultButton title="Não" onPress={onCancel} />
            <DefaultButton
              title="Sim"
              onPress={onConfirm}
              style={{ container: { backgroundColor: DefaultColors.error } }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
