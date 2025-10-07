import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type SCHEMES = "light" | "dark";

export function useColorScheme() {
  const [scheme, setScheme] = useState<SCHEMES>();

  useEffect(() => {
    const loadScheme = async () => {
      try {
        const value = await AsyncStorage.getItem("colorScheme");
        if (value) setScheme(value === "light" ? "light" : "dark");
      } catch (error) {
        console.log(error);
      }
    };
    loadScheme();
  }, []);

  const storeScheme = async (value: SCHEMES) => {
    try {
      await AsyncStorage.setItem("colorScheme", value);
      setScheme(value === "light" ? "light" : "dark");
    } catch (error) {
      console.log(error);
    }
  };

  return { scheme, setScheme: storeScheme };
}
