import {
    Alert,
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addItem } from "@/libs/inventory";

export default function CustomInputScreen() {
    const { scheme } = useTheme();
    const [productName, setProductName] = useState<string>("");
    const [productCode, setProductCode] = useState<string>("");
    const [expired, setExpired] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(1);
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

    useEffect(() => {
        if (amount && amount <= 1) setAmount(1);
    }, [amount]);

    async function onSubmit() {
        try {
            await addItem({
                code: productCode,
                product_name: productName,
                amount: amount,
                expiredAt: expired
            });
        } catch {
            Alert.alert("Hiba történt a felvevés közben");
        }
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
                        autoCorrect={false}
                        keyboardType="default"
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
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
                        value={amount.toString()}
                        maxLength={3}
                        autoCorrect={false}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                            setAmount(+text);
                        }}
                        placeholder={t("customInput.productName")}
                    />
                    <DateTimePicker
                        mode="date"
                        display="default"
                        value={expired}
                        onChange={(_, selectedDate) => {
                            const currentDate = selectedDate || expired;
                            setExpired(currentDate);
                        }}
                        maximumDate={new Date(new Date().getFullYear() + 10, 0, 1)}
                    />
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
