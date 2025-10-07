import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";

export default function Button({
  label,
  action,
  chevron,
}: {
  label: string;
  action: any;
  chevron?: boolean;
}) {
    const {scheme} = useTheme();
  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[scheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      backgroundColor: `${Colors[scheme ?? "light"].primary}10`,
    },
    buttonLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    chevron: {
      opacity: 0.5,
    },
    icon: {
      marginRight: 12,
    },
  });
  return (
    <TouchableOpacity style={styles.button} onPress={action}>
      <View style={styles.buttonLeft}>
        <MaterialCommunityIcons
          name="translate"
          size={24}
          color={Colors[scheme ?? "light"].text}
          style={styles.icon}
        />
        <ThemedText>{label}</ThemedText>
      </View>
      {chevron ?? (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={Colors[scheme ?? "light"].text}
          style={styles.chevron}
        />
      )}
    </TouchableOpacity>
  );
}
