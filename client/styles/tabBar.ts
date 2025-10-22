import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export function tabBar({
  scheme,
  HapticTab,
}: {
  scheme: keyof typeof Colors;
  HapticTab: any;
}) {
  const styles = StyleSheet.create({
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
    tabBarButton: HapticTab,
  });

  return {
    ...styles,
    tabBarActiveTintColor: Colors[scheme ?? "light"].tabIconSelected,
    tabBarInactiveTintColor: Colors[scheme ?? "light"].tabIconDefault,
  };
}
