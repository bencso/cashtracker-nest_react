import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import Scrollview from "@/components/scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailCorrect, setEmailCorrect] = useState<boolean>(false);
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const emailTextInput = useRef<TextInput>(null);

  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "column",
      gap: 8,
    },
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      gap: 50,
    },
    input: {
      color: Colors[colorScheme ?? "light"].text,
      paddingTop: 16,
      paddingBottom: 16,
      paddingStart: 10,
      // TODO: Majd ezeket a szineket átalakítani megcsinálni :)
      borderWidth: 1,
      borderColor: "#C7C7CD",
      borderRadius: 12,
      fontSize: 16,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}10`,
    },
    inputContainer: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
      alignItems: "stretch",
    },
    button: {
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].button,
      borderRadius: 12,
      padding: 15,
      paddingTop: 18,
      paddingBottom: 18,
      width: "100%",
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
            : "#C7C7CD",
        },
      });
    }
  }, [email]);

  return (
    <Scrollview>
      <ThemedView style={styles.mainContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Jó újra látni!</ThemedText>
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
              placeholder="Email-cím"
            />
            <TextInput
              style={styles.input}
              value={password}
              maxLength={150}
              autoComplete="password"
              autoCorrect={false}
              keyboardType="visible-password"
              secureTextEntry
              textContentType="password"
              autoCapitalize="none"
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder="Jelszó"
            />
            <Pressable onPress={onSubmit} style={styles.button}>
              <Text>Bejelentkezés</Text>
            </Pressable>
            <View style={styles.notHaveAccount}>
              <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
                Nincs még fiókod?
              </Text>
              <Pressable>
                <Text
                  style={{
                    color: Colors[colorScheme ?? "light"].button,
                    fontWeight: "bold",
                  }}
                >
                  Regisztrálj!
                </Text>
              </Pressable>
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </Scrollview>
  );
}
