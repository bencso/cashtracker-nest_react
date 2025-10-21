import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="language"
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="theme"
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="passwordchange"
          options={{
            headerShown: false,
            animation: "simple_push"
          }} />
      </Stack>
    </>
  );
}
