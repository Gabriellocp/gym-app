import { Stack } from "expo-router";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";
export default function App() {
  return (
    <SQLiteProvider databaseName="workouts.db">
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
    </SQLiteProvider>
  );
}
