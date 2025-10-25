import {
    Alert,
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
import { usePantry } from "@/contexts/pantry-context";
import { router } from "expo-router";
import { getCustomInputStyles } from "@/styles/camera/customInput";

export default function CustomInputScreen() {
    const [productName, setProductName] = useState<string>("");
    const [productCode, setProductCode] = useState<string>("");
    const [expired, setExpired] = useState<Date>(new Date());
    const [amount, setAmount] = useState<number>(1);
    const { scheme } = useTheme();
    const { addPantryItem, product, setProduct, loadPantry, setScanned, setProductItemByKeyword, setProductItemByCode } = usePantry();
    const { t } = useTranslation();

    useEffect(() => {
        if (product?.code) setProductCode(product.code);
        if (product?.name) setProductName(product.name);
    }, [product])

    const disabledButton = productName?.length === 0;

    function productNameOnChange(text: string) {
        setProductName(text);
    }

    useEffect(() => {
        if (amount && amount <= 1) setAmount(1);
    }, [amount]);

    {/* TODO: MAGYAROSÍTÁSOK */ }
    async function onSubmit() {
        try {
            if (productCode && productName && amount)
                await addPantryItem({
                    code: productCode,
                    product_name: productName,
                    amount: amount,
                    expiredAt: expired
                });
            else throw new Error("Kérem adja meg a kötelező mezőket!");
            router.dismiss();
            router.navigate("/(auth)/inventory");
            loadPantry();
        } catch {
            Alert.alert("Hiba történt a felvevés közben");
        }
        finally {
            setProduct(null);
            setScanned(false);
        }
    }

    const styles = getCustomInputStyles({ scheme, disabledButton });

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
                        style={{ ...styles.input, color: (product?.name === null) ? Colors[scheme ?? "light"].text : `${Colors[scheme ?? "light"].text}80` }}
                        placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
                        value={productName}
                        maxLength={150}
                        autoCorrect={false}
                        keyboardType="default"
                        autoCapitalize="none"
                        returnKeyType="next"
                        editable={product?.name === null}
                        onBlur={() => {
                            setProductItemByKeyword(productName);
                        }}
                        returnKeyLabel={t("buttons.next")}
                        onChangeText={(text) => {
                            productNameOnChange(text);
                        }}
                        placeholder={t("customInput.productName")}
                    />
                    <TextInput
                        style={{ ...styles.input, color: (product?.code === null) ? Colors[scheme ?? "light"].text : `${Colors[scheme ?? "light"].text}80` }}
                        value={productCode}
                        maxLength={150}
                        placeholderTextColor={`${Colors[scheme ?? "light"].text}80`}
                        autoCorrect={false}
                        keyboardType="number-pad"
                        returnKeyType="next"
                        editable={product?.code === null} 
                        returnKeyLabel={t("buttons.next")}
                        autoCapitalize="none"
                        onBlur={() => {
                            setProductItemByCode(productCode);
                        }}
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
                        returnKeyType="done"
                        returnKeyLabel={t("buttons.done")}
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
