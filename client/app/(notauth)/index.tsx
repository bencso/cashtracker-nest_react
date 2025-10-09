import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { t } from "i18next";
import { Text } from "react-native";

export default function IndexScreen() {
    const { scheme } = useTheme();
  return (
    <ThemedView>
      <Text
        style={{
          color: Colors[scheme ?? "light"].button,
          fontWeight: "bold",
        }}
      >
        {t("auth.register")}
      </Text>
    </ThemedView>
  );
}
