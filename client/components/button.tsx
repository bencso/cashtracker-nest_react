import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";

export default function Button({
  label,
  action,
  chevron,
  icon,
  coloredIcon
}: {
  label: string;
  action: any;
  chevron?: boolean;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  coloredIcon?: boolean;
}) {
  const { scheme } = useTheme();
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
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={coloredIcon ? Colors[scheme ?? "light"].button : Colors[scheme ?? "light"].text}
            style={label ? styles.icon : null}
          />
        )}
      {label &&(  <ThemedText>{label}</ThemedText>)}
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
