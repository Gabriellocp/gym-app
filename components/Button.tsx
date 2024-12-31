import { DefaultColors } from "@/constants/Colors";
import { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type DefaultButtonProps = TouchableOpacityProps & { title: ReactNode } & {
  style?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<ViewStyle>;
  };
};
const defaultButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: DefaultColors.primary,
    minHeight: 40,
    display: "flex",
    flexDirection: "row",
    padding: 16,
    width: 200,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: DefaultColors.text,
  },
});
export default function DefaultButton(props: DefaultButtonProps) {
  return (
    <TouchableOpacity
      style={[defaultButtonStyle.container, props.style?.container]}
      activeOpacity={0.5}
    >
      <Text style={defaultButtonStyle.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}
