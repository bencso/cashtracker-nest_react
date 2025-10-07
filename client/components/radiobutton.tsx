import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ColorSchemeName,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";

interface OptionsParam {
  label: string;
  icon: any;
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
    groupButtom: {
      display: "flex",
      flexDirection: "row",
      gap: 12,
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}10`,
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
  });

  const button = StyleSheet.create({
    active: {
      flexDirection: "row",
      gap: 12,
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}30`,
    },
    notActive: {
      flexDirection: "row",
      gap: 12,
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}10`,
    },
  });

  return (
    <View style={styles.rows}>
      {options?.map((option, idx) => (
        <TouchableOpacity
          disabled={checkedValue === option.value}
          onPress={() => {
            onChange(option.value);
          }}
          key={idx}
        >
          <View
            style={
              checkedValue === option.value ? button.active : button.notActive
            }
          >
            <View style={styles.groupLeft}>
              <MaterialCommunityIcons
                name={option.icon}
                size={24}
                color={Colors[colorScheme ?? "light"].text}
                style={styles.icon}
              />
              <ThemedText>{option.label}</ThemedText>
            </View>
            <MaterialCommunityIcons
              name={
                checkedValue === option.value
                  ? "radiobox-marked"
                  : "radiobox-blank"
              }
              size={24}
              color={Colors[colorScheme ?? "light"].text}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
