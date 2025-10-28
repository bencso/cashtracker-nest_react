import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default function getLoginStyles({
  scheme,
  disabledButton,
}: { 
  scheme: keyof typeof Colors;
  disabledButton: boolean;
}) {
  return StyleSheet.create({
    titleContainer: {
      flexDirection: "column",
      gap: 8,
    },
    mainContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      gap: 24,
      paddingVertical: 40,
      paddingHorizontal: 24,
    },
    input: {
      color: Colors[scheme ?? "light"].text,
      paddingTop: 16,
      paddingBottom: 16,
      paddingStart: 10,
      borderWidth: 1,
      borderColor: Colors[scheme ?? "light"].border,
      borderRadius: 12,
      fontSize: 16,
      backgroundColor: Colors[scheme ?? "light"].border,
    },
    inputContainer: {
      display: "flex",
      gap: 16,
      justifyContent: "center",
    },
    button: {
      alignItems: "center",
      backgroundColor: Colors[scheme ?? "light"].button,
      borderRadius: 40,
      padding: 15,
      paddingTop: 18,
      paddingBottom: 18,
      fontWeight: "bold",
      width: "100%",
      fontSize: 20,
      opacity: !disabledButton ? 1 : 0.7,
    },
    notHaveAccount: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color:  `${Colors[scheme ?? "light"].buttomText}80`
    }
  });
}
