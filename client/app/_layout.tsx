import { Colors } from "@/constants/theme";
import { AuthProvider } from "@/contexts/auth-context";
import { LanguageProvider, useLanguage } from "@/contexts/language-context";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import en from "@/translations/en";
import hu from "@/translations/hu";
import {
  useFonts,
  ZalandoSans_400Regular,
  ZalandoSans_700Bold,
  ZalandoSans_900Black,
} from "@expo-google-fonts/zalando-sans";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import i18next from "i18next";
import { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

function AppContent() {
  const { scheme, isLoading: themeLoading } = useTheme();
  const {isLoading : languageLoading, Language} = useLanguage();

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    i18next
      .use(initReactI18next)
      .init({
        resources: {
          hu: { translation: hu },
          en: { translation: en }
        },
        lng: Language,
        fallbackLng: Language,
        interpolation: {
          escapeValue: false,
        },
      });
  }, [Language]);

  const [loaded, error] = useFonts({
    ZalandoSans_400Regular,
    ZalandoSans_700Bold,
    ZalandoSans_900Black,
  });

  useEffect(() => {
    if (loaded || error || languageLoading || themeLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, languageLoading, themeLoading]);

  if (!loaded && !error) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color={Colors[scheme ?? "light"].primary}
        />
        <Text>Betöltés...</Text>
      </View>
    );
  }

  return (
    <NavigationThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
    </AuthProvider>
  );
}
