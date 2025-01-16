import RepositoryProvider from "@/components/RepositoryProvider";
import ServiceProvider from "@/components/ServiceProvider";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack } from "expo-router";

export default function App() {
  return (
    <RepositoryProvider>
      <ServiceProvider>
        <ActionSheetProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="workout"
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack>
        </ActionSheetProvider>
      </ServiceProvider>
    </RepositoryProvider>
  );
}
