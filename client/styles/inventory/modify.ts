import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

//TODO: Több componens ugyanaz a style-al rendelkezik ezeket egyesíteni majd :)
export const getInventoryModifyStyles = ({
  scheme,
  disabledButton
}: {
  scheme: keyof typeof Colors;
  disabledButton: boolean;
}) => {
  return StyleSheet.create({
    titleContainer: {
      flexDirection: "column",
      gap: 8,
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "space-between",
      gap: 24,
      paddingVertical: 40,
      paddingHorizontal: 24,
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
  });
};
