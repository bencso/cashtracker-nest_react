import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Fonts } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Product, usePantry } from "@/contexts/pantry-context";
import { useEffect } from "react";

export default function InventoryScreen() {
  const { scheme: colorScheme } = useTheme();
  const { t } = useTranslation();
  const { pantry, deletePantryItem, loadPantry } = usePantry();
  
  useEffect(() => {
    loadPantry();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      paddingTop: 50,
      padding: 18
    },
    content: {
      padding: 10,
      paddingTop: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    textContainer: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      alignContent: "center",
      marginVertical: 8,
    },
    productTitle: {
      fontWeight: "bold",
      fontSize: 18,
      textTransform: "uppercase",
      fontFamily: Fonts.bold,
      color: Colors[colorScheme ?? "light"].text,
      width: "70%",

    },
    productSecond: {
      fontSize: 16,
      color: Colors[colorScheme ?? "light"].text,
    },
    productIcon: {
      width: 50,
      height: 50,
      backgroundColor: "black",
      borderRadius: "100%",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }
  });

  const RightAction = ({ progress, dragX, index }: { progress: SharedValue<number>; dragX: SharedValue<number>; index?: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const translateX = Math.max(0, dragX.value);
      return {
        transform: [{ translateX }],
        opacity: progress.value,
      };
    });

    return (
      <Reanimated.View
        style={[
          { padding: 10, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
          animatedStyle,
        ]}
      >
        <TouchableOpacity onPress={async () => {
          if (index) await deletePantryItem({ id: index });
        }}>
          <ThemedText type="defaultSemiBold" style={{ color: 'white' }}>
            Törlés
          </ThemedText>
        </TouchableOpacity>
      </Reanimated.View>
    );
  };

  return <ThemedView style={styles.container}>
    <ThemedText type="title">Raktár</ThemedText>
    {
      (pantry !== null) && <ThemedView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* */}
          <GestureHandlerRootView >
            {
              pantry.length > 0 && pantry.map((product: Product, idx: number) => (
                <ReanimatedSwipeable
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
                          product.name?.at(0)
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
  </ThemedView>;
}