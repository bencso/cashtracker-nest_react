import { PantryProvider } from "@/contexts/pantry-context";
import { Stack } from "expo-router";

export default function InventoryLayout() {
  return (
    <PantryProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
    </PantryProvider>
  );
}
