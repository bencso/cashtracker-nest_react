import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  return (
    <TouchableOpacity style={styles.button} onPress={action}>
      <View style={styles.buttonLeft}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={Colors["light"].buttomText}
            style={label ? styles.icon : null}
          />
        )}
        {label && (<ThemedText style={
          {
            color: Colors["light"].buttomText
          }
        }>{label}</ThemedText>)}
      </View>
      {
        chevron ?? (
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={coloredIcon ? Colors[scheme ?? "light"].neutral : Colors[scheme ?? "light"].buttomText}
            style={styles.chevron}
          />
        )
      }
    </TouchableOpacity >
  );
}
