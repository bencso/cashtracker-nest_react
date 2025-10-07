import Button from "@/components/button";
import { RadioButtons } from "@/components/radiobutton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { t } from "i18next";
import { useEffect, useState } from "react";
import {
  ColorSchemeName,
  StyleSheet,
  View
} from "react-native";

export default function SettingsScreen() {
  const { scheme: colorScheme } = useTheme();
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
          <ThemedText type="defaultSemiBold" style={styles.settingGroupTitle}>
            {t("settings.appearance")}
          </ThemedText>
          <Button
            label={t("settings.languages.cta")}
            action={() => {
              router.replace("/(tabs)/settings/language");
            }}
          />
        </View>
        <ThemeButton />
      </ThemedView>
    </ThemedView>
  );
}

//TODO: Memória tárolásba megoldani
function ThemeButton() {
  const [selectedTheme, setSelectedTheme] = useState<ColorSchemeName>();
  const { scheme, setScheme } = useTheme();
  const styles = StyleSheet.create({
    icon: {
      marginRight: 12,
    },
    group: {
      flexDirection: "column",
      gap: 12,
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[scheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      backgroundColor: `${Colors[scheme ?? "light"].primary}10`,
    },
    groupLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    groupBottom: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    chevron: {
      opacity: 0.5,
    },
  });
  useEffect(() => {
    if (selectedTheme !== scheme) {
      setSelectedTheme(scheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheme]);

  const handleChange = (value: ColorSchemeName) => {
    setSelectedTheme(value);
    setScheme(value ?? "light");
  };

  return (
    <View style={styles.group}>
      <View style={styles.groupLeft}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={24}
          color={Colors[scheme ?? "light"].text}
          style={styles.icon}
        />
        <ThemedText>{t("settings.colortheme.cta")}</ThemedText>
      </View>
      <RadioButtons
        options={[
          {
            label: t("settings.colortheme.light"),
            icon: "white-balance-sunny",
            value: "light",
          },
          {
            label: t("settings.colortheme.dark"),
            icon: "moon-waning-crescent",
            value: "dark",
          },
        ]}
        checkedValue={selectedTheme}
        onChange={handleChange}
        colorScheme={scheme}
      />
    </View>
  );
}
