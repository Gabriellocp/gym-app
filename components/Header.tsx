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
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: DefaultColors.accentText,
    flex: 1,
  },
});

type HeaderProps = BottomTabHeaderProps;

export default function Header({
  layout,
  navigation,
  options,
  route,
}: BottomTabHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{options.title}</Text>
    </View>
  );
}
