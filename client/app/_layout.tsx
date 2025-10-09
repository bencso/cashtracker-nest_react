import { Colors } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { router, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import i18next, { t } from "i18next";
import { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";
import { SplashScreenController } from "./splash";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { scheme, isLoading: themeLoading } = useTheme();
  const { isLoading: languageLoading, Language } = useLanguage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    i18next.use(initReactI18next).init({
      resources: {
        hu: { translation: hu },
        en: { translation: en },
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
    async function hideSplash() {
      if (loaded || error || languageLoading || themeLoading) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn("Error hiding splash screen:", e);
        }
      }
    }
    hideSplash();
  }, [loaded, error, languageLoading, themeLoading]);

  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          size="large"
          color={Colors[scheme ?? "light"].primary}
        />
        <Text style={{ marginTop: 10 }}>{t("alerts.loading")}</Text>
      </View>
    );
  }

  return (
    <NavigationThemeProvider
      value={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen
            name="(notauth)"
            options={{
              headerShown: true,
              headerTransparent: true,
              title: "",
              headerRight: () => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: 6,
                    }}
                    onPress={() => {
                      router.push("/settings");
                    }}
                  >
                    <MaterialCommunityIcons
                      name="cog"
                      size={24}
                      color={Colors[scheme ?? "light"].text}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!!isAuthenticated}>
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: true,
              headerTransparent: true,
              title: "",
              headerRight: () => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: 6,
                    }}
                    onPress={() => {
                      router.push("/settings");
                    }}
                  >
                    <MaterialCommunityIcons
                      name="cog"
                      size={24}
                      color={Colors[scheme ?? "light"].text}
                    />
                  </TouchableOpacity>
                );
              },
            }}
          />
        </Stack.Protected>
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
            title: t("tabs.settings"),
            headerLeft: () => {
              if (usePathname() === "/settings") return null;
              else
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 5,
                    }}
                    onPress={() => {
                      router.replace("/settings");
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
      <SplashScreenController />
      <LanguageProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
