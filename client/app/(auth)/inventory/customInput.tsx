import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CustomInputScreen() {
    const { scheme } = useTheme();
    const [productName, setProductName] = useState<string>("");
    const [productCode, setProductCode] = useState<string>("");
    const { t } = useTranslation();
    const disabledButton = productName.length < 0;

    const styles = StyleSheet.create({
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
    });

    function productNameOnChange(text: string) {
        setProductName(text);
    }

    async function onSubmit() {

    }

    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ textTransform: "uppercase" }}>
                    {t("customInput.cta")}
                </ThemedText>
            </ThemedView>
            <ThemedView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
                        value={productName}
                        maxLength={150}
                        autoComplete="name"
                        autoCorrect={false}
                        keyboardType="default"
                        textContentType="name"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            productNameOnChange(text);
                        }}
                        placeholder={t("customInput.productName")}
                    />
                    <TextInput
                        style={styles.input}
                        value={productCode}
                        maxLength={150}
                        placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
                        autoCorrect={false}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        placeholder={t("customInput.productCode")}
                        onChangeText={(text) => {
                            setProductCode(text);
                        }}
                    />
                    <DateTimePicker mode="date" display="default" value={new Date()} maximumDate={new Date(new Date().getFullYear() + 10, 0, 1)}/>
                    <TouchableOpacity
                        disabled={disabledButton}
                        onPress={onSubmit}
                        style={styles.button}
                    >
                        <Text
                            style={{
                                textTransform: "uppercase",
                            }}
                        >
                            {t("customInput.send")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </ThemedView>
    );
}
