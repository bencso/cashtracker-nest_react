import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "../contexts/auth-context";

export default function SplashScreenController() {
  const { isLoading } = useAuth();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch((e) =>
      console.warn("Failed to prevent auto hide:", e)
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch((e) =>
        console.warn("Error hiding splash screen:", e)
      );
    }
  }, [isLoading]);

  return null;
}
