import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AuthenticatedScreen() {
  const { scheme: colorScheme } = useTheme();
  const { userData } = useAuth();
  const { t } = useTranslation();
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
    title: {
      maxWidth: "80%",
      fontSize: 20
    },
    topBarContainer: {
      flexDirection: "column",
      gap: 17,
      color: Colors[colorScheme ?? "light"].text,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 24,
      fontSize: 16,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}70`,
    },
    topBar: {
      flexDirection: "column",
      gap: 12,
      color: Colors[colorScheme ?? "light"].text,
      backgroundColor: "white",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 24,
      fontSize: 16,
      overflow: "scroll",
      maxHeight: 180
    },
    topBarItem: {
      flexDirection: "row",
      width: "100%",
      padding: 12,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? "light"].border,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "space-between"
    }
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.settingGroup}>
          <ThemedText type="title" style={styles.title}>
            {t("main.title")} {userData && userData.username}
          </ThemedText>
        </View>
        <ThemedView style={styles.topBarContainer}>
          <ThemedText style={{ fontSize: 15 }}>
            Bevásárlólista
          </ThemedText>
          <ScrollView style={styles.topBar}>
            {/* */}
            <ThemedView style={styles.topBarItem}>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
                Paprika
              </ThemedText>
            </ThemedView>
            {/* */}
            {/* */}
            <ThemedView style={styles.topBarItem}>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
                Paradicsom
              </ThemedText>
              <ThemedText style={{ fontSize: 12, color: Colors[colorScheme ?? "light"].text }}>
                2x
              </ThemedText>
            </ThemedView>
            {/* */}
            {/* */}
            <ThemedView style={styles.topBarItem}>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
                Uborka
              </ThemedText>
            </ThemedView>
            {/* */}
            {/* */}
            <ThemedView style={styles.topBarItem}>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
                Coca cola
              </ThemedText>
            </ThemedView>
            {/* */}
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
