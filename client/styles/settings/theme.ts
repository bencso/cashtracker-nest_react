import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const getThemeStyles = ({ scheme }: { scheme: keyof typeof Colors }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      paddingTop: 70,
    },
    content: {
      flex: 1,
      padding: 16,
      gap: 12,
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
  });
};
