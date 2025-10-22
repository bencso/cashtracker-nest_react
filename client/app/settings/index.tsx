import Button from "@/components/button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { settingsStyles } from "@/styles/settings";
import { getAuthenticatedStyles } from "@/styles/settings/authenticated";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function SettingsScreen() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const styles = settingsStyles;

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
              router.navigate("/settings/language");
            }}
            icon="translate"
          />
          <Button
            label={t("settings.colortheme.cta")}
            action={() => {
              router.navigate("/settings/theme");
            }}
            icon="theme-light-dark"
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
}

function AuthenticatedSection() {
  const { scheme: colorScheme } = useTheme();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const styles = getAuthenticatedStyles({colorScheme});
  return (
    <ThemedView style={styles.settingGroup}>
      <ThemedText type="defaultSemiBold" style={styles.settingGroupTitle}>
        {t("settings.authenticated.title")}
      </ThemedText>
      <Button
        label={t("settings.authenticated.password")}
        action={() => {
          router.navigate("/settings/passwordchange");
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
