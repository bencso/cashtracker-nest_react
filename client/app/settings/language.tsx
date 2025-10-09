import { RadioButtons } from "@/components/radiobutton";
import { ThemedView } from "@/components/themed-view";
import { GbFlag } from "@/components/ui/flags/en";
import { HuFlag } from "@/components/ui/flags/hu";
import { Colors } from "@/constants/theme";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { Stack } from "expo-router";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function LanguageScreen() {
  const { scheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const { Language, setLanguage } = useLanguage();

  useEffect(() => {
    if (selectedLanguage !== Language) {
      setSelectedLanguage(Language);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Language]);

  const handleChange = (value: any) => {
    setSelectedLanguage(value);
    setLanguage(value ?? "en");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
    },
    content: {
      flex: 1,
      padding: 16,
      gap: 12,
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
  });

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: t("settings.languages.cta"),
        }}
      />
      <ThemedView style={styles.content}>
        <View style={styles.group}>
          {/* Zászlók innen: https://www.untitledui.com/resources/flag-icons */}
          <RadioButtons
            options={[
              {
                label: t("settings.languages.hu"),
                value: "hu",
                icon: <HuFlag />,
              },
              {
                label: t("settings.languages.en"),
                value: "en",
                icon: <GbFlag />,
              },
            ]}
            checkedValue={selectedLanguage}
            onChange={handleChange}
            colorScheme={scheme}
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
}
