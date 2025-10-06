import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].neutral + "CC",
          backdropFilter: "blur(10px)",
          bottom: 20,
          width: "95%",
          borderRadius: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          paddingBottom: 8,
          paddingTop: 8,
          paddingStart: 8,
          paddingEnd: 8,
          minHeight: 70,
          zIndex: 30,
          height: "auto",
          position: "absolute",
          transform: [{ translateX: "2.5%" }],
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 3,
          borderWidth: 1,
          borderColor: Colors[colorScheme ?? "light"].neutral + "40",
        },
        tabBarLabelStyle: {
          marginTop: 4,
          fontWeight: "600",
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].background,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].icon,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
