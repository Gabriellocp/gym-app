import { DefaultColors } from "@/constants/Colors";
import { forwardRef, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type DefaultButtonProps = TouchableOpacityProps & { title: ReactNode } & {
  style?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
  center?: boolean;
  variant?: "default" | "secondary" | "error";
};
const defaultButtonStyle = StyleSheet.create({
  container: {
    minHeight: 40,
    display: "flex",
    flexDirection: "row",
    padding: 4,
    alignSelf: "flex-start",
    minWidth: 140,
    maxWidth: 200,
    borderRadius: 100,
    // borderWidth: 0.8,
    // borderColor: DefaultColors.primary,
    justifyContent: "center",
  },
  default: {
    backgroundColor: DefaultColors.primary,
  },
  error: {
    backgroundColor: DefaultColors.error,
  },
  secondary: {
    backgroundColor: DefaultColors.accent,
  },
  text: {
    textTransform: "uppercase",
    alignContent: "center",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 16,
    fontWeight: "700",
    color: DefaultColors.accentText,
  },
});
const DefaultButton = forwardRef(
  (
    { variant = "default", ...props }: DefaultButtonProps,
    ref: React.ForwardedRef<any>
  ) => {
    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        style={[
          defaultButtonStyle.container,
          props.style?.container,
          defaultButtonStyle[variant as keyof typeof defaultButtonStyle],
          props.center && { alignSelf: "center" },
        ]}
        activeOpacity={0.5}
      >
        <Text style={[defaultButtonStyle.text, props.style?.text]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  }
);
export default DefaultButton;
