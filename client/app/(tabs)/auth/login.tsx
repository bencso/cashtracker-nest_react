import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const { scheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCorrect, setEmailCorrect] = useState<boolean>(false);
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const emailTextInput = useRef<TextInput>(null);
  const { t } = useTranslation();

  const { login } = useAuth();
  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "column",
      gap: 8,
    },
    mainContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      gap: 24,
      paddingVertical: 40,
      paddingHorizontal: 24,
    },
    input: {
      color: Colors[scheme ?? "light"].text,
      paddingTop: 16,
      paddingBottom: 16,
      paddingStart: 10,
      // TODO: Majd ezeket a szineket átalakítani megcsinálni :)
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
    },
    notHaveAccount: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  function emailOnChange(text: string) {
    setEmail(text);
    setEmailCorrect(emailRegex.test(text));
  }

  async function onSubmit() {
    const result = await login({ email: email, password: password });
    if (typeof result == "boolean" && result === true) {
      //TODO: Megcsinálni a bejelentkezés után mi legyen!
      router.push("/(tabs)/settings");
    } else {
      Alert.alert(
        t("alerts.loginErrorTitle"),
        t("alerts.loginErrorMessage")
      );
    }
  }

  useEffect(() => {
    if (emailTextInput.current) {
      let active = email.length > 0;
      emailTextInput.current.setNativeProps({
        style: {
          borderColor: active
            ? emailCorrect
              ? Colors[scheme ?? "light"].correct
              : Colors[scheme ?? "light"].uncorrect
            : Colors[scheme ?? "light"].neutral + "CC",
        },
      });
    }
  }, [emailCorrect, email, scheme]);

  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ textTransform: "uppercase" }}>
          {t("auth.welcome")}
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            ref={emailTextInput}
            placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
            value={email}
            maxLength={150}
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            onChangeText={(text) => {
              emailOnChange(text);
            }}
            placeholder={t("forms.email")}
          />
          <TextInput
            style={styles.input}
            value={password}
            maxLength={150}
            placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
            autoComplete="current-password"
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
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text
              style={{
                textTransform: "uppercase",
              }}
            >
              {t("auth.login")}
            </Text>
          </TouchableOpacity>
          <View style={styles.notHaveAccount}>
            <Text style={{ color: Colors[scheme ?? "light"].text }}>
              {t("auth.noAccount")}
            </Text>
            <TouchableOpacity onPress={() => {
              router.replace("/(tabs)/auth/registration")
            }}>
              <Text
                style={{
                  color: Colors[scheme ?? "light"].button,
                  fontWeight: "bold",
                }}
              >
                {t("auth.register")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
