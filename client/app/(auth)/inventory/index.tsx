import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Fonts } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { getItems } from "@/libs/inventory";

interface Product {
  code: string;
  name?: string;
  amount?: number;
  inDb?: boolean;
}

export default function InventoryScreen() {
  const { scheme: colorScheme } = useTheme();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    async function getProducts(){
      setProducts(await getItems());
    }

    getProducts();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    content: {
      flex: 1,
      padding: 24,
      gap: 32,
      paddingTop: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    cameraTools: {
      position: "absolute",
      zIndex: 20,
      bottom: 120,
      alignSelf: "center",
      display: "flex",
      flexDirection: "row",
      gap: 12,
      backgroundColor: "transparent",
      elevation: 5,
    },
    textContainer: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      alignContent: "center",
      marginVertical: 8,
    },
    buttonsContainer: {
      gap: 16,
      marginTop: 24,
      width: "100%"
    },
    productTitle: {
      fontWeight: "bold",
      fontSize: 18,
      textTransform: "uppercase",
      fontFamily: Fonts.bold,
      color: Colors[colorScheme ?? "light"].text,
      flex: 1,
    },
    productSecond: {
      fontSize: 16,
      color: Colors[colorScheme ?? "light"].text,
      flex: 2,
      flexWrap: "wrap",
    },
  });


  return <ThemedView style={styles.container}>
    {
      (products !== null) && <ThemedView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* */}
          {
            products.map((product: Product, idx: number) => (
              <ThemedView key={idx}>
                <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                  <View style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "black",
                    borderRadius: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }} >
                  </View>
                  <ThemedText type="defaultSemiBold" style={{ fontSize: 17 }}>
                    {product.name}
                  </ThemedText>
                </View>
                <ThemedText style={{ fontSize: 14, color: Colors[colorScheme ?? "light"].text }}>
                  {product.code}
                </ThemedText>
                <ThemedText style={{ fontSize: 14, color: Colors[colorScheme ?? "light"].text }}>
                  {product.amount}
                </ThemedText>
              </ThemedView>
            ))
          }
          {/* */}
        </ScrollView>
      </ThemedView>
    }
  </ThemedView>;
}