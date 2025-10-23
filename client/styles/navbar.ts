import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default function getNavbarStyles({
  colorScheme,
}: {
  colorScheme: keyof typeof Colors;
}) {
  return StyleSheet.create({
    navbar: {
      flexDirection: "column",
      backgroundColor: Colors[colorScheme ?? "light"].background,
      paddingTop: 63,
      paddingLeft: 20,
      paddingRight: 20,
    },
    title: {
      maxWidth: "80%",
      color: `${Colors[colorScheme ?? "light"].text}`,
    },
  });
}
