import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PasswordChangeScreen() {
  const { scheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  const disabledButton = password.length < 0 || rePassword.length < 0;

  useEffect(() => {
    if (!isAuthenticated) router.replace("/settings");
  }, [isAuthenticated]);

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
    input: {
      color: Colors[scheme ?? "light"].text,
      paddingTop: 16,
      paddingBottom: 16,
      paddingStart: 10,
      borderWidth: 1,
      borderColor: Colors[scheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      fontSize: 16,
      backgroundColor: `${Colors[scheme ?? "light"].primary}10`,
    },
    inputContainer: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
    },
    button: {
      alignItems: "center",
      backgroundColor: Colors[scheme ?? "light"].button,
      borderRadius: 12,
      padding: 15,
      paddingTop: 18,
      paddingBottom: 18,
      fontWeight: "bold",
      width: "100%",
      fontSize: 20,
      opacity: !disabledButton ? 1 : 0.5,
    },
  });

  async function onSubmit() {
    if (rePassword.length !== password.length || password.length === 0 || rePassword.length === 0) {
      let message = t("alerts.authPasswordMatchMessage");

      if (password.length === 0) message = t("alerts.authMissingPassword");
      else if (rePassword.length === 0) message = t("alerts.authMissingRePassword");

      Alert.alert(t("alerts.authErrorMessage"), message);
      return;
    }
  }

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <View style={styles.inputContainer}>
            <ThemedText type="default">
              {t("auth.password")}:
            </ThemedText>
            <TextInput
              style={styles.input}
              value={password}
              maxLength={150}
              placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
              autoComplete="new-password"
              autoCorrect={false}
              keyboardType="visible-password"
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
              placeholder={t("forms.password")}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <ThemedText type="default">
              {t("auth.repassword")}:
            </ThemedText>
            <TextInput
              style={styles.input}
              value={rePassword}
              maxLength={150}
              placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
              autoComplete="new-password"
              autoCorrect={false}
              keyboardType="visible-password"
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
              placeholder={t("forms.repassword")}
              onChangeText={(text) => {
                setRePassword(text);
              }}
            />
            <TouchableOpacity
              disabled={disabledButton}
              onPress={onSubmit}
              style={styles.button}
            >
              <Text>
                {t("auth.passwordChange")}
              </Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ThemedView>
    </>
  );
}
