"use client";

import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
