import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/contexts/theme-context";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePantry } from "@/contexts/pantry-context";
import { getInventoryModifyStyles } from "@/styles/inventory/modify";
import Button from "@/components/button";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/theme";

type ItemType = {
    index: number;
    name: string;
    amount: number;
    expiredat: string;
    code: string;
}

//TODO: Loadingok megcsinálása, ezenfelül refaktorálás stb.
export default function DeleteItemScreen() {
    const [selectedItemsId, setSelectedItemsId] = useState<number[]>([]);
    const [products, setProducts] = useState([]);
    const { scheme } = useTheme();
    const { deletePantryItem } = usePantry();
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
                <View style={{ flex: 1, height: "100%", gap: 16, marginTop: 16 }}>
                    {products?.map((product: ItemType, idx) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: "row", width: "100%", justifyContent: "space-between", padding: 16, alignItems: "center", borderRadius: 24, borderWidth: 1, borderColor: selectedItemsId.includes(product.index)
                                    ? Colors[scheme ?? "light"].primary : Colors[scheme ?? "light"].border, backgroundColor: selectedItemsId.includes(product.index)
                                        ? Colors[scheme ?? "light"].primary : Colors[scheme ?? "light"].border
                            }}
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
                                            ? "check-circle-outline"
                                            : "circle-outline"
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
                {
                    selectedItemsId.length > 0 && <Button disabled={selectedItemsId.length === 0} label={selectedItemsId.length + " " + t("inventory.deleteItem.cta")} icon="trash-can" action={async () => {
                        if (selectedItemsId.length > 0) {
                            try {
                                await deletePantryItem({ id: selectedItemsId });
                                if (router.canGoBack()) router.back();
                                router.replace("/inventory");
                            } catch {
                                console.log("Hiba történt a törlés közben!");
                            }
                        }
                    }} />
                }
            </ThemedView>
        </ThemedView>
    );
}
