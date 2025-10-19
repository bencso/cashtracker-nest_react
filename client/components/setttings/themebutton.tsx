"use client";

import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { ColorSchemeName, StyleSheet, View } from "react-native";
import { RadioButtons } from "../radiobutton";
import { ThemedText } from "../themed-text";

export default function ThemeButton() {
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
      borderRadius: 24,
      backgroundColor: `${Colors[scheme ?? "light"].primary}40`,
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
  }, [scheme, selectedTheme]);

  const handleChange = (value: ColorSchemeName) => {
    setSelectedTheme(value);
    setScheme(value ?? "light");
  };

  return (
    <View style={styles.group}>
      <View style={styles.groupLeft}>
        <ThemedText type="defaultSemiBold">{t("settings.colortheme.cta")}</ThemedText>
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
