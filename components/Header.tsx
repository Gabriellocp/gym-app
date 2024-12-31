import { DefaultColors } from "@/constants/Colors";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: DefaultColors.primary,
  },
  headerTitle: {
    fontSize: 18,
    textAlign: "center",
    color: DefaultColors.text,
    flex: 1,
  },
});

export default function Header({
  layout,
  navigation,
  options,
  route,
}: BottomTabHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Bem-vindo</Text>
    </View>
  );
}
