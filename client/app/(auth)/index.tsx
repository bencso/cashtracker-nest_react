import Button from "@/components/button";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { t } from "i18next";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const { scheme: colorScheme } = useTheme();
  const { logout } = useAuth();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
    },
    content: {
      flex: 1,
      padding: 16,
      gap: 12,
      paddingTop: 100,
    },
    buttons: {
      flexDirection: "row",
      alignItems: "center",
      color: Colors[colorScheme ?? "light"].text,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      fontSize: 16,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}10`,
    },
    settingGroup: {
      gap: 12,
    },
    settingGroupTitle: {
      marginBottom: 8,
      marginLeft: 4,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.settingGroup}>
          <Button
            label={t("auth.logout")}
            action={async () => {
              await logout();
            }}
            chevron={false}
            icon="logout"
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
}
