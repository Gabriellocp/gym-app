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
              tabBarActiveTintColor: "blue",
              header: (props) => <Header {...props} />,
              sceneStyle: {
                flex: 1,
                backgroundColor: DefaultColors.backgroud,
              },
              tabBarStyle: {
                backgroundColor: DefaultColors.primary,
              },
              tabBarLabelPosition: "below-icon",
              tabBarLabelStyle: {
                paddingBottom: insets.bottom,
                color: DefaultColors.text,
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: () => <Ionicons name="home" size={30} />,
              }}
            />
          </Tabs>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
