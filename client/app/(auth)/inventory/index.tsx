import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { usePantry } from "@/contexts/pantry-context";
import { useCallback } from "react";
import { Product } from "@/constants/product.interface";
import getNavbarStyles from "@/styles/navbar";
import { getInventoryStyle } from "@/styles/inventory";
import { useFocusEffect } from "expo-router";

export default function InventoryScreen() {
  const { scheme: colorScheme } = useTheme();
  const { t } = useTranslation();
  const { pantry, deletePantryItem, loadPantry } = usePantry();

  useFocusEffect(
    useCallback(() => {
      loadPantry();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );


  const styles = getInventoryStyle({ colorScheme });
  const navbarStyle = getNavbarStyles({ colorScheme });

  const RightAction = ({ progress, dragX, index }: { progress: SharedValue<number>; dragX: SharedValue<number>; index?: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const translateX = Math.max(0, dragX.value);
      return {
        transform: [{ translateX }],
        opacity: progress.value,
      };
    });

    return (
      <Reanimated.View style={{ ...animatedStyle }}>
        <TouchableOpacity style={styles.deleteButton} onPress={async () => {
          if (index) await deletePantryItem({ id: index });
        }} >
          <ThemedText style={styles.deleteButtonText}>{t("inventory.delete")}</ThemedText>
        </TouchableOpacity>
      </Reanimated.View>
    );
  };

  return (
    <><View style={navbarStyle.navbar}>
      <ThemedText type="title" style={navbarStyle.title}>
        {t("inventory.title")}
      </ThemedText>
    </View>
      <ThemedView style={styles.container}>
        {
          (pantry !== null) && <ThemedView style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* */}
              <GestureHandlerRootView style={{ gap: 12 }}>
                {
                  pantry.length > 0 && pantry.map((product: Product, idx: number) => (
                    <ReanimatedSwipeable
                      containerStyle={{ padding: 20, paddingTop: 0, paddingBottom: 0 }}
                      key={idx}
                      friction={1}
                      enableTrackpadTwoFingerGesture
                      rightThreshold={80}
                      renderRightActions={(progress, dragX, _) => (
                        <RightAction progress={progress} dragX={dragX} index={product.index} />
                      )}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                          <View style={styles.productIcon} >
                            <ThemedText type="subtitle" style={{ color: "white" }}>{
                              product.name?.at(0)?.toUpperCase()
                            }</ThemedText>
                          </View>
                          <ThemedText numberOfLines={1} type="defaultSemiBold" style={styles.productTitle}>
                            {product.name}
                          </ThemedText>
                        </View>
                        <ThemedText style={styles.productSecond}>
                          {product.amount} x
                        </ThemedText>
                      </View>
                    </ReanimatedSwipeable>
                  ))
                }
              </GestureHandlerRootView>
              {/* */}
            </ScrollView>

          </ThemedView>
        }
      </ThemedView>
    </>)
}