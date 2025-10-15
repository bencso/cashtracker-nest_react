import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/auth-context";

export default function RegistrationScreen() {
  const { registration } = useAuth();
  const { scheme } = useTheme();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCorrect, setEmailCorrect] = useState<boolean>(false);
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const emailTextInput = useRef<TextInput>(null);
  const { t } = useTranslation();
  const disabledButton =
    !emailCorrect ||
    password.length < 0 ||
    email.length < 0 ||
    username.length < 0;

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
    if (email.length === 0 || password.length === 0 || username.length === 0) {
      let message = t("alerts.authErrorMessage");

      if (username.length === 0) message = t("alerts.authMissingUsername");
      else if (email.length === 0) message = t("alerts.authMissingEmail");
      else if (password.length === 0) message = t("alerts.authMissingPassword");

      Alert.alert(t("alerts.authErrorMessage"), message);
      return;
    }
    const result = await registration({
      username: username,
      email: email,
      password: password,
    });
    if (typeof result !== "boolean" && result !== true) {
      let error = t("alerts.registrationErrorMessage");
      if (result === "Ez az email cím már regisztrálva van!")
        error = t("alerts.registrationEmailErrorMessage");
      Alert.alert(t("alerts.registrationErrorTitle"), error);
    } else {
      Alert.alert(
        t("alerts.registrationSuccessTitle"),
        t("alerts.registrationSuccessMessage")
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
          {t("auth.welcomeRegistration")}
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            ref={emailTextInput}
            value={username}
            maxLength={30}
            autoComplete="nickname"
            placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
            autoCorrect={false}
            keyboardType="default"
            textContentType="nickname"
            autoCapitalize="none"
            onChangeText={(text) => {
              setUsername(text);
            }}
            placeholder={t("forms.username")}
          />
          <TextInput
            style={styles.input}
            ref={emailTextInput}
            value={email}
            maxLength={30}
            autoComplete="email"
            placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
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
            maxLength={35}
            autoComplete="current-password"
            autoCorrect={false}
            keyboardType="visible-password"
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            placeholder={t("forms.password")}
            placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TouchableOpacity
            disabled={disabledButton}
            onPress={onSubmit}
            style={styles.button}
          >
            <Text
              style={{
                textTransform: "uppercase",
              }}
            >
              {t("auth.registration")}
            </Text>
          </TouchableOpacity>
          <View style={styles.notHaveAccount}>
            <Text style={{ color: Colors[scheme ?? "light"].text }}>
              {t("auth.haveAccount")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/(notauth)/auth/login");
              }}
            >
              <Text
                style={{
                  color: Colors[scheme ?? "light"].button,
                  fontWeight: "bold",
                }}
              >
                {t("auth.loginCTA")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
