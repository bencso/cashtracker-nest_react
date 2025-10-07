import { RadioButtons } from "@/components/radiobutton";
import { ThemedView } from "@/components/themed-view";
import { GbFlag } from "@/components/ui/flags/en";
import { HuFlag } from "@/components/ui/flags/hu";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function LanguageScreen() {
  const { scheme } = useTheme();
    const [selectedLanguage, setSelectedLanguage] = useState<string>("hu");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      marginTop: 30,
    },
    content: {
      flex: 1,
      padding: 16,
      gap: 12,
      paddingTop: 100,
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
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 5,
                }}
                onPress={() => {
                  router.replace("/(tabs)/settings");
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color={Colors[scheme ?? "light"].text}
                />
              </TouchableOpacity>
            );
          },
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
            onChange={setSelectedLanguage}
            colorScheme={scheme}
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
}
