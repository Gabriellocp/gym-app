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
};
const defaultButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: DefaultColors.primary,
    minHeight: 40,
    display: "flex",
    flexDirection: "row",
    padding: 4,
    alignSelf: "flex-start",
    minWidth: 120,
    maxWidth: 200,
    borderRadius: 8,
    justifyContent: "center",
  },
  text: {
    alignContent: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: DefaultColors.text,
  },
});
const DefaultButton = forwardRef(
  (props: DefaultButtonProps, ref: React.ForwardedRef<any>) => {
    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        style={[
          defaultButtonStyle.container,
          props.style?.container,
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
