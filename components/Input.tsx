import { DefaultColors } from "@/constants/Colors";
import { TextInput, TextInputProps } from "react-native";
type InputProps = TextInputProps;
export default function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={{
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 16,
        paddingHorizontal: 8,
        backgroundColor: DefaultColors.primary,
      }}
    ></TextInput>
  );
}
