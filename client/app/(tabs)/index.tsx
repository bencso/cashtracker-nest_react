import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { t } from "i18next";
import { Text } from "react-native";

export default function IndexScreen() {
    const { scheme: colorScheme } = useColorScheme();
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
