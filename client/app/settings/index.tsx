import Button from "@/components/button";
import ThemeButton from "@/components/setttings/themebutton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      paddingTop: 120
    },
    content: {
      flex: 1,
      padding: 16,
      gap: 24,
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
  const { logout } = useAuth();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    buttons: {
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].button,
      borderRadius: 40,
      padding: 15,
      paddingTop: 18,
      paddingBottom: 18,
      fontWeight: "bold",
      width: "100%",
      fontSize: 20,
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
      <Button
        label={t("auth.logout")}
        action={async () => {
          await logout();
        }}
        chevron={false}
        icon="logout"
      />
    </ThemedView>
  );
}
