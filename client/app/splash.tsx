import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "../contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { useLanguage } from "@/contexts/language-context";

export default function SplashScreenController() {
  const { isLoading } = useAuth();
  const { isLoading: themeLoading } = useTheme();
  const { isLoading: languageLoading } = useLanguage();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {});
  }, []);

  useEffect(() => {
    if (!isLoading && !themeLoading && !languageLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading, themeLoading, languageLoading]);

  return null;
}
