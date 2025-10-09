import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="registration"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
