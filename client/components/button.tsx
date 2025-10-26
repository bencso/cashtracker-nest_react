import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { getButtonStyles } from "@/styles/button";

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
  const styles = getButtonStyles(scheme);
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
