import Button from "@/components/button";
import ThemeButton from "@/components/setttings/themebutton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { t } from "i18next";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const { scheme: colorScheme } = useTheme();
  const { isAuthenticated } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
    },
    content: {
      flex: 1,
      padding: 16,
      gap: 24,
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
        {isAuthenticated && <AuthenticatedSection />}
        <View style={styles.settingGroup}>
          <ThemedText type="defaultSemiBold" style={styles.settingGroupTitle}>
            {t("settings.appearance")}
          </ThemedText>
          <Button
            label={t("settings.languages.cta")}
            action={() => {
              router.replace("/settings/language");
            }}
            icon="translate"
          />
          <ThemeButton />
        </View>
      </ThemedView>
    </ThemedView>
  );
}

function AuthenticatedSection() {
  const { scheme: colorScheme } = useTheme();
  const styles = StyleSheet.create({
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
    <ThemedView style={styles.settingGroup}>
      <ThemedText type="defaultSemiBold" style={styles.settingGroupTitle}>
        {t("settings.authenticated.title")}
      </ThemedText>
      <Button
        label={t("settings.authenticated.password")}
        action={() => {
          router.replace("/settings/passwordchange");
        }}
        icon="form-textbox-password"
      />
    </ThemedView>
  );
}
