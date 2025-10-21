import { RadioButtons } from "@/components/radiobutton";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function ThemeScreen() {
    const { scheme, setScheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState<string>();
    const { t } = useTranslation();

    useEffect(() => {
        if (selectedTheme !== scheme) {
            setSelectedTheme(scheme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scheme]);

    const handleChange = (value: any) => {
        setSelectedTheme(value);
        setScheme(value ?? "light");
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: "100%",
            paddingTop: 70
        },
        content: {
            flex: 1,
            padding: 16,
            gap: 12,
        },
        group: {
            flexDirection: "column",
            gap: 12,
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 24,
            backgroundColor: `${Colors[scheme ?? "light"].primary}40`,
        },
    });

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.content}>
                <View style={styles.group}>
                    <RadioButtons
                        options={[
                            {
                                label: t("settings.colortheme.light"),
                                value: "light",
                                icon: "weather-sunny",
                            },
                            {
                                label: t("settings.colortheme.dark"),
                                value: "dark",
                                icon: "moon-waning-crescent",
                            },
                        ]}
                        checkedValue={selectedTheme}
                        onChange={handleChange}
                        colorScheme={scheme}
                    />
                </View>
            </ThemedView>
        </ThemedView>
    );
}
