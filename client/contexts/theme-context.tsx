import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  scheme: 'light' | 'dark';
  setScheme: (scheme: 'light' | 'dark') => void;
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setSchemeState] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScheme = async () => {
      try {
        const value = await AsyncStorage.getItem("colorScheme");
        if (value === 'dark' || value === 'light') {
          setSchemeState(value);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadScheme();
  }, []);

  const setScheme = async (newScheme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem("colorScheme", newScheme);
      setSchemeState(newScheme);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeContext.Provider value={{ scheme, setScheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}