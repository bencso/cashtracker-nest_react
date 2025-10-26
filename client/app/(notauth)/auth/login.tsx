import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import getLoginStyles from "@/styles/auth/login";
import { emailRegex } from "@/constants/regex";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const { scheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCorrect, setEmailCorrect] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const emailTextInput = useRef<TextInput>(null);
  const { t } = useTranslation();
  const disabledButton =
    !emailCorrect || password.length < 0 || email.length < 0;

  const { login } = useAuth();

  function emailOnChange(text: string) {
    setEmail(text);
    setEmailCorrect(emailRegex.test(text));
  }

  const styles = getLoginStyles({
    disabledButton: disabledButton, scheme: scheme
  });

  async function onSubmit() {
    if (email.length === 0 || password.length === 0) {
      let message = t("alerts.authErrorMessage");

      if (email.length === 0) message = t("alerts.authMissingEmail");
      else if (password.length === 0) message = t("alerts.authMissingPassword");

      Alert.alert(t("alerts.authErrorMessage"), message);
      return;
    }
    const result = await login({ email: email, password: password });
    if (typeof result !== "boolean" && result !== true)
      Alert.alert(t("alerts.authErrorTitle"), t("alerts.authErrorMessage"));
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
            : Colors[scheme ?? "light"].border,
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
          <View style={{ position: "relative", justifyContent: "center" }}>
            <TextInput
              style={styles.input}
              value={password}
              maxLength={150}
              placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
              autoComplete="current-password"
              autoCorrect={false}
              keyboardType="default"
              textContentType="password"
              autoCapitalize="none"
              enablesReturnKeyAutomatically
              secureTextEntry={!showPassword}
              placeholder={t("forms.password")}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                top: 0,
                bottom: 0,
                justifyContent: "center",
                height: "100%",
              }}
              onPress={() => {
                setShowPassword((prev) => !prev);
              }}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
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
              {t("auth.login")}
            </Text>
          </TouchableOpacity>
          <View style={styles.notHaveAccount}>
            <Text style={{ color: Colors[scheme ?? "light"].text }}>
              {t("auth.noAccount")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/(notauth)/auth/registration");
              }}
            >
              <Text
                style={{
                  color: Colors[scheme ?? "light"].text,
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
