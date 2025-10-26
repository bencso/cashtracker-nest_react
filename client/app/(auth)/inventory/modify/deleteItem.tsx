import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/contexts/theme-context";
import {  useState } from "react";
import { useTranslation } from "react-i18next";
import { usePantry } from "@/contexts/pantry-context";
import { getCustomInputStyles } from "@/styles/camera/customInput";
import Button from "@/components/button";

//TODO: Külön routera rá lehet tenni apira majd hogy ne frontenden kelljen intézni a szürést az itemekre mikor betöltjük,
// és akkor csak megmondja melyik code alapján keressen a backend és a frontend megkapja az adott itemek mik lehetnek
export default function DeleteItemScreen() {
    const [selectedItemsId, setSelectedItemsId] = useState<number[]>([]);
    const { scheme } = useTheme();
    // const { deletePantryItem } = usePantry();
    const { t } = useTranslation();

    const disabledButton = selectedItemsId?.length === 0;

    const styles = getCustomInputStyles({ scheme, disabledButton });

    return (
        <ThemedView style={styles.mainContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ textTransform: "uppercase" }}>
                    {t("inventory.deleteItem.title")}
                </ThemedText>
            </ThemedView>
            <ThemedView>
                <Button label={t("inventory.deleteItem.cta")} icon="trash-can" chevron action={()=>{
                    console.log("TÖRLÉS!");
                }}/>
            </ThemedView>
        </ThemedView>
    );
}
