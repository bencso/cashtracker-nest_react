import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/contexts/theme-context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePantry } from "@/contexts/pantry-context";
import { getInventoryModifyStyles } from "@/styles/inventory/modify";
import Button from "@/components/button";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

type ItemType = {
    index: number;
    name: string;
    amount: number;
    expiredat: string;
    code: string;
}

//TODO: Külön routera rá lehet tenni apira majd hogy ne frontenden kelljen intézni a szürést az itemekre mikor betöltjük,
// és akkor csak megmondja melyik code alapján keressen a backend és a frontend megkapja az adott itemek mik lehetnek
export default function DeleteItemScreen() {
    const [selectedItemsId, setSelectedItemsId] = useState<number[]>([]);
    const [products, setProducts] = useState([]);
    const { scheme } = useTheme();
    // const { deletePantryItem } = usePantry();
    const { t } = useTranslation();
    const params = useLocalSearchParams();
    const { getItemsById } = usePantry();

    const disabledButton = selectedItemsId?.length === 0;

    const styles = getInventoryModifyStyles({ scheme, disabledButton });

    useFocusEffect(() => {
        async function getItem() {
            const code = params.code;
            const items = await getItemsById({ code })
            setProducts(items.products);
        }

        getItem();
    })


    function selectItem({
        productId
    }: { productId: number }) {
        if (selectedItemsId.includes(productId))
            setSelectedItemsId([...selectedItemsId.filter((selectedItem) => selectedItem !== productId)]);
        else setSelectedItemsId([...selectedItemsId, productId]);
    }

    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ textTransform: "uppercase" }}>
                    {t("inventory.deleteItem.title")}
                </ThemedText>
                <View style={{ flex: 1, height: "100%" }}>
                    {products?.map((product: ItemType, idx) => (
                        <TouchableOpacity
                            style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", padding: 16, alignItems: "center" }}
                            onPress={() => selectItem({
                                productId: product.index
                            })}
                            key={idx}
                        >
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
                                    <View>
                                        <ThemedText>{new Date(product.expiredat).toLocaleDateString()}</ThemedText>
                                    </View>
                                    <View>
                                        <ThemedText>{product.amount}x</ThemedText>
                                    </View>
                                </View>
                                <MaterialCommunityIcons
                                    name={
                                        selectedItemsId.includes(product.index)
                                            ? "radiobox-marked"
                                            : "radiobox-blank"
                                    }
                                    size={24}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ThemedView>
            <ThemedView style={{
                gap: 12,
            }}>
                <Button label={t("inventory.deleteItem.cta")} icon="trash-can" disabled={selectedItemsId.length === 0} action={() => {
                    console.log("TÖRLÉS!");
                }} />
                {
                    selectedItemsId.length > 0 && <Button disabled={selectedItemsId.length === 0} label={selectedItemsId.length + " " + t("inventory.deleteItem.cta")} icon="trash-can" action={() => {
                        console.log("TÖRLÉS!");
                    }} />
                }
            </ThemedView>
        </ThemedView>
    );
}
