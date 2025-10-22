import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { tabBar } from "@/styles/tabBar";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { t } from "i18next";
import React from "react";
import { Platform } from "react-native";

export default function AuthLayout() {
  const { scheme } = useTheme();

  if (Platform.OS === "ios") {
    return (
      <NativeTabs
        minimizeBehavior="onScrollDown"
        shadowColor={Colors[scheme ?? "light"].button}
      >
        <NativeTabs.Trigger name="auth">
          <Icon
            selectedColor={Colors[scheme ?? "light"].tabIconSelected}
            sf="door.left.hand.open"
            drawable="custom_door_open_drawable"
          />
          <Label hidden>{t("tabs.login")}</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  const screenOptions = tabBar({ scheme, HapticTab });

  return (
    <Tabs
      screenOptions={{
        ...screenOptions,
        headerShown: false,
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.login"),
          tabBarIcon: () => (
            <Icon sf="paperplane.fill" drawable="custom_paperplane_drawable" />
          ),
        }}
      />
    </Tabs>
  );
}
