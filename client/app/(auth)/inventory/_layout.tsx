import { Stack } from "expo-router";

export default function InventoryLayout() {

  return (
    <Stack>
      <Stack.Screen name="camera" options={{ headerShown: false}} />
    </Stack>
  );
}
