import { Colors } from "@/constants/theme";
import { PantryProvider, usePantry } from "@/contexts/pantry-context";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function CameraLayout() {
  const { scheme } = useTheme();

  return (
    <PantryProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="customInput" options={{
        headerShown: true,
        headerTransparent: true,
        title: "",
        presentation: "modal",
        animation: "fade_from_bottom",
        headerLeft: () => {
          return <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 5,
            }}
            onPress={() => {
              router.back();
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={Colors[scheme ?? "light"].text}
            />
          </TouchableOpacity>
        }
      }} />
    </Stack>
    </PantryProvider>
  );
}
