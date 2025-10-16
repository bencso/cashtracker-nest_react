import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function PasswordChangeScreen() {
  const { scheme } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/settings");
  }, []);

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
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}></ThemedView>
      </ThemedView>
    </>
  );
}
