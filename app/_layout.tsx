import { Stack } from "expo-router";

export default function App() {
  return (
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
  );
}
