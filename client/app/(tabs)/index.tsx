import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { t } from "i18next";
import { Text, useColorScheme } from "react-native";

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  return (
    <ThemedView>
      <Text
        style={{
          color: Colors[colorScheme ?? "light"].button,
          fontWeight: "bold",
        }}
      >
        {t("auth.register")}
      </Text>
    </ThemedView>
  );
}
