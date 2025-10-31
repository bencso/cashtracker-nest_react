import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const getThemeButtonStyle = (scheme: keyof typeof Colors) =>{
    return StyleSheet.create({
    icon: {
      marginRight: 12,
    },
    group: {
      flexDirection: "column",
      gap: 12,
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 24,
      backgroundColor: `${Colors[scheme ?? "light"].primary}40`,
    },
    groupLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    groupBottom: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    chevron: {
      opacity: 0.5,
    },
  });
}