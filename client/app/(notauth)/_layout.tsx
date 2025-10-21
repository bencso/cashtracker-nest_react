import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
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

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors[scheme ?? "light"].neutral + "CC",
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
          borderColor: Colors[scheme ?? "light"].neutral + "40",
        },
        tabBarLabelStyle: {
          marginTop: 4,
          fontSize: 12,
          fontFamily: "ZalandoSans_700Bold",
        },
        tabBarActiveTintColor: Colors[scheme ?? "light"].tabIconSelected,
        tabBarInactiveTintColor: Colors[scheme ?? "light"].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
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
