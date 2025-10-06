import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { t } from "i18next";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
    },
    content: {
      flex: 1,
      padding: 16,
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
    icon: {
      marginRight: 12,
    },
    settingGroup: {
      gap: 12,
    },
    settingGroupTitle: {
      marginBottom: 8,
      marginLeft: 4,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}10`,
    },
    buttonLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    chevron: {
      opacity: 0.5,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.settingGroup}>
          <ThemedText type="defaultSemiBold" style={styles.settingGroupTitle}>
            {t("settings.apperiance")}
          </ThemedText>
          <Pressable style={styles.button}>
            <View style={styles.buttonLeft}>
              <MaterialCommunityIcons
                name="translate"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
                style={styles.icon}
              />
              <ThemedText>{t("settings.languages.cta")}</ThemedText>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
              style={styles.chevron}
            />
          </Pressable>
          <Pressable style={styles.button}>
            <View style={styles.buttonLeft}>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
                style={styles.icon}
              />
              <ThemedText>{t("settings.colortheme.cta")}</ThemedText>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
              style={styles.chevron}
            />
          </Pressable>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
