import RepositoryProvider from "@/components/RepositoryProvider";
import ServiceProvider from "@/components/ServiceProvider";
import { Stack } from "expo-router";

export default function App() {
  return (
    <RepositoryProvider>
      <ServiceProvider>
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
      </ServiceProvider>
    </RepositoryProvider>
  );
}
