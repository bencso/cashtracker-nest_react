import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCorrect, setEmailCorrect] = useState<boolean>(false);
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const emailTextInput = useRef<TextInput>(null);
  const { t } = useTranslation();

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
      color: Colors[colorScheme ?? "light"].text,
      paddingTop: 16,
      paddingBottom: 16,
      paddingStart: 10,
      // TODO: Majd ezeket a szineket átalakítani megcsinálni :)
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      fontSize: 16,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}10`,
    },
    inputContainer: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
    },
    button: {
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].button,
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

  function onSubmit() {}

  useEffect(() => {
    if (emailTextInput.current) {
      let active = email.length > 0;
      emailTextInput.current.setNativeProps({
        style: {
          borderColor: active
            ? emailCorrect
              ? Colors[colorScheme ?? "light"].correct
              : Colors[colorScheme ?? "light"].uncorrect
            : Colors[colorScheme ?? "light"].neutral + "CC",
        },
      });
    }
  }, [emailCorrect, email]);

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
          <Pressable onPress={onSubmit} style={styles.button}>
            <Text
              style={{
                textTransform: "uppercase",
              }}
            >
              {t("auth.registration")}
            </Text>
          </Pressable>
          <View style={styles.notHaveAccount}>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              {t("auth.haveAccount")}
            </Text>
            <Pressable onPress={() => {
              router.replace("/(tabs)/login")
            }}>
              <Text
                style={{
                  color: Colors[colorScheme ?? "light"].button,
                  fontWeight: "bold",
                }}
              >
                {t("auth.loginCTA")}
              </Text>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}
