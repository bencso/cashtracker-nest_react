import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type LanguageContextType = {
  Language: 'en' | 'hu';
  setLanguage: (Language: 'en' | 'hu') => void;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [Language, setLanguageState] = useState<'en' | 'hu'>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("userLanguage");
        if (value === 'hu' || value === 'en') {
          setLanguageState(value);
          // eslint-disable-next-line import/no-named-as-default-member
          await i18next.changeLanguage(value);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (newLanguage: 'en' | 'hu') => {
    try {
      await AsyncStorage.setItem("userLanguage", newLanguage);
      setLanguageState(newLanguage);
      // eslint-disable-next-line import/no-named-as-default-member
      await i18next.changeLanguage(newLanguage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LanguageContext.Provider value={{ Language, setLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}