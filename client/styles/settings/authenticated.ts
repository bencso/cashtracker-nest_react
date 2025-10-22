import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

 export const getAuthenticatedStyles = ({colorScheme}: {colorScheme: keyof typeof Colors}) => {
    return  StyleSheet.create({
    buttons: {
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].button,
      borderRadius: 40,
      padding: 15,
      paddingTop: 18,
      paddingBottom: 18,
      fontWeight: "bold",
      width: "100%",
      fontSize: 20,
    },
    settingGroup: {
      gap: 12,
    },
    settingGroupTitle: {
      marginBottom: 8,
      marginLeft: 4,
    },
  });
 }