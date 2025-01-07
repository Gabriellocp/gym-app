import { useEffect, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
type InputProps = TextInputProps & {
  label: string;
  value: string;
};

export default function Input(props: InputProps) {
  const [state, setState] = useState<"show" | "hide">();
  const [value, setValue] = useState<string>();
  const getInputTextState = (text?: string) => (!!text ? "show" : "hide");
  useEffect(() => {
    setState((prev) => {
      if (prev === "show") {
        return prev;
      }
      return getInputTextState(props.value);
    });
  }, [props.value]);
  return (
    <View>
      {state === "show" ? (
        <Text style={{ fontSize: 12, marginLeft: 8 }}>{props.label}</Text>
      ) : (
        <View style={{ height: 12 }} />
      )}
      <TextInput
        {...props}
        value={props.value}
        placeholder={state === "show" ? "" : props.label}
        style={{
          fontSize: 16,
          fontWeight: 600,
          borderBottomWidth: 1,
          // borderRadius: 4,
          paddingHorizontal: 8,
          // backgroundColor: DefaultColors.primary,
        }}
        clearTextOnFocus
        onFocus={() => {
          setState("show");
        }}
        onEndEditing={() => {
          setState(getInputTextState(value));
        }}
        onChangeText={(text) => {
          setValue(text);
          props.onChangeText && props.onChangeText(text);
        }}
      ></TextInput>
    </View>
  );
}
