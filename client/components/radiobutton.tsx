import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ColorSchemeName,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface OptionsParam {
  label: string;
  icon: React.ReactNode | string;
  value: string;
}

export const RadioButtons = ({
  options,
  checkedValue,
  onChange,
  colorScheme,
  style,
}: {
  options?: OptionsParam[] | null;
  checkedValue: any;
  onChange: any;
  colorScheme: ColorSchemeName;
  style?: string | null;
}) => {
  const styles = StyleSheet.create({
    icon: {
      marginRight: 12,
    },
    groupLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    chevron: {
      opacity: 0.5,
    },
    rows: {
      gap: 12,
    },
    iconContainer: {
      marginRight: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    label: {
      marginLeft: 8,
      color: Colors[colorScheme ?? "light"].buttomText
    },
  });

  const button = StyleSheet.create({
    active: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].button,
      borderRadius: 40,
      padding: 20,
      paddingTop: 18,
      paddingBottom: 18,
      fontWeight: "bold",
      fontSize: 20,
      justifyContent: "space-between"
    },
    notActive: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: `${Colors[colorScheme ?? "light"].button}70`,
      borderRadius: 40,
      padding: 20,
      paddingTop: 18,
      paddingBottom: 18,
      fontWeight: "bold",
      fontSize: 20,
      justifyContent: "space-between"
    },
  });

  return (
    <View style={styles.rows}>
      {options?.map((option, idx) => (
        <TouchableOpacity
          disabled={checkedValue === option.value}
          onPress={() => onChange(option.value)}
          key={idx}
        >
          <View
            style={
              checkedValue === option.value ? button.active : button.notActive
            }
          >
            <View style={styles.buttonContent}>
              {typeof option.icon === "string" ? (
                <MaterialCommunityIcons
                  name={
                    option.icon as keyof typeof MaterialCommunityIcons.glyphMap
                  }
                  size={24}
                  color={Colors[colorScheme ?? "light"].buttomText}
                  style={styles.icon}
                />
              ) : (
                <View style={styles.iconContainer}>{option.icon}</View>
              )}
              <ThemedText style={styles.label}>{option.label}</ThemedText>
            </View>
            <MaterialCommunityIcons
              name={
                checkedValue === option.value
                  ? "radiobox-marked"
                  : "radiobox-blank"
              }
              size={24}
              color={Colors[colorScheme ?? "light"].buttomText}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
