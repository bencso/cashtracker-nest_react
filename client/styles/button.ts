import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const getButtonStyles = (scheme: keyof typeof Colors) => StyleSheet.create({
    button: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors[scheme ?? "light"].button,
      borderRadius: 40,
      padding: 20,
      paddingTop: 18,
      paddingBottom: 18,
      fontWeight: "bold",
      fontSize: 20,
      justifyContent: "space-between"
    },
    buttonLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    chevron: {
      opacity: .9,
    },
    icon: {
      marginRight: 20,
    },
  });