import Header from "@/components/Header";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { DefaultColors } from "@/constants/Colors";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <SafeAreaProvider>
        <StatusBar backgroundColor={"grey"} />
        <SafeAreaView style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              header: (props) => <Header {...props} />,
              tabBarActiveTintColor: DefaultColors.accent,
              tabBarInactiveTintColor: DefaultColors.accentText,
              sceneStyle: {
                flex: 1,
                backgroundColor: DefaultColors.background,
              },
              tabBarStyle: {
                backgroundColor: DefaultColors.primary,
              },
              tabBarLabelPosition: "below-icon",
              tabBarLabelStyle: {
                paddingBottom: insets.bottom,
                color: DefaultColors.accentText,
              },
              tabBarLabel: (props) => {
                props.color = props.focused
                  ? DefaultColors.accent
                  : DefaultColors.accentText;
                return (
                  <Text style={{ fontSize: 10, color: props.color }}>
                    {props.children}
                  </Text>
                );
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: (props) => <Ionicons name="home" {...props} />,
              }}
            />
            <Tabs.Screen
              name="history"
              options={{
                title: "Histórico",
                tabBarIcon: (props) => <Ionicons name="list" {...props} />,
              }}
            />
          </Tabs>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
