import { ReactNode } from "react";
import { StyleSheetProperties, View } from "react-native";

type ContentViewProps = {
  children: ReactNode;
  style?: StyleSheetProperties;
};
export default function ContentView({ children, style }: ContentViewProps) {
  return (
    <View style={{ flex: 1, padding: 16, flexDirection: "column", ...style }}>
      {children}
    </View>
  );
}
