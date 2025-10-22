import Button from "@/components/button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Fonts } from "@/constants/theme";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "react-i18next";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePantry } from "@/contexts/pantry-context";

export default function CameraScreen() {
  const { scheme: colorScheme } = useTheme();
  const { t } = useTranslation();
  const { product, setProduct } = usePantry();
  const facing = "back";
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState<boolean>(false);

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

  if (!permission) {
    return <ThemedView style={styles.content}>
    </ThemedView>
  }

  if (!permission.granted) {
    if (permission.canAskAgain) {
      return (
        <ThemedView style={styles.content}>
          <ThemedText type="title">{t("camera.permission.title")}</ThemedText>
          <ThemedText>{t("camera.permission.description")}</ThemedText>
          <Button action={requestPermission} icon="camera" label={t("camera.permission.cta")} />
        </ThemedView>
      );
    }

    return (
      <ThemedView style={styles.content}>
        <ThemedText type="title">{t("camera.permission.title")}</ThemedText>
        <Button
          action={() => {
            Linking.openSettings();
          }}
          icon="cog"
          label={t("camera.permission.openSettings")}
        />
      </ThemedView>
    );
  }

  return <ThemedView style={styles.container}>

    {
      (product === null) &&
      <ThemedView style={styles.content}>
        <CameraOverlay facing={facing} torch={torch} />
        <ThemedView style={styles.cameraTools}>
          <Button icon={torch ? "flashlight" : "flashlight-off"} label="" chevron={false} coloredIcon action={() => {
            setTorch(!torch);
          }} />
          <Button icon={"pen"} label={t("inventory.camera.custominput")} chevron={false} coloredIcon action={() => {
            router.navigate("/(auth)/camera/customInput");
          }} />
        </ThemedView>
      </ThemedView>
    }
    {
      (product !== null) && <ThemedView style={styles.content}>
        <TouchableOpacity
          style={{
            padding: 8,
            borderRadius: 24,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 60,
            left: 18,
            overflow: "hidden",
            zIndex: 10,
          }}
          onPress={() => {
            router.replace("/settings");
          }}
        >
          <MaterialCommunityIcons
            name="bug"
            size={24}
            color={Colors[colorScheme ?? "light"].text}
          />
        </TouchableOpacity>
        <ThemedText type="title">
          {t("camera.inventory.title")}
        </ThemedText>
        {/* */}
        <ThemedView style={styles.textContainer}>
          <ThemedText style={styles.productTitle}>
            {t("camera.inventory.code")}:
          </ThemedText>
          <ThemedText style={styles.productSecond}>
            {product?.code}
          </ThemedText>
        </ThemedView>
        {/* */}
        {/* */}
        <ThemedView style={styles.textContainer}>
          <ThemedText style={styles.productTitle}>
            {t("camera.inventory.name")}:
          </ThemedText>
          <ThemedText style={styles.productSecond}>
            {product?.name}
          </ThemedText>
        </ThemedView>
        {/* */}
        <ThemedView style={styles.buttonsContainer}>
          <Button label={t("camera.inventory.rescan")} icon="barcode" chevron action={() => {
            setProduct(null);
            setTorch(false);
          }} />
          {
            !product.code && <Button label={t("camera.inventory.customadd")} icon="plus" chevron action={() => {
              setProduct(null);
            }} />
          }
        </ThemedView>
      </ThemedView>
    }
  </ThemedView>;
}


function CameraOverlay({
  torch,
  facing
}: {
  torch: any;
  facing: any;
}) {
  const [scanned, setScanned] = useState<boolean>(false);
  const { setProduct } = usePantry();

  const styles = StyleSheet.create({
    maskContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "transparent",
    },
    overlayTop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '40%',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },
    overlayBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40%',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },
    overlayLeft: {
      position: 'absolute',
      top: '40%',
      bottom: '40%',
      left: 0,
      width: '12%',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },
    overlayRight: {
      position: 'absolute',
      top: '40%',
      bottom: '40%',
      right: 0,
      width: '12%',
      backgroundColor: 'rgba(0,0,0,0.35)',
    },
    cutoutContainer: {
      height: "100%",
      width: "100%",
      backgroundColor: "transparent",
    },
    cutoutTopLeft: {
      height: 2,
      width: "10%",
      top: "40%",
      left: "12%",
      position: "absolute"
    },
    cutoutLeftTop: {
      width: 2,
      height: "5%",
      top: "40%",
      left: "12%",
      position: "absolute"
    },
    cutoutTopRight: {
      height: 2,
      width: "10%",
      top: "40%",
      right: "12%",
      position: "absolute"
    },
    cutoutRightTop: {
      width: 2,
      height: "5%",
      top: "40%",
      right: "12%",
      position: "absolute"
    },
    cutoutRightBottom: {
      width: 2,
      height: "5%",
      bottom: "40%",
      right: "12%",
      position: "absolute"
    },
    cutoutBottomRight: {
      height: 2,
      width: "10%",
      bottom: "40%",
      right: "12%",
      position: "absolute"
    },
    cutoutLeftBottom: {
      width: 2,
      height: "5%",
      bottom: "40%",
      left: "12%",
      position: "absolute"
    },
    cutoutBottomLeft: {
      height: 2,
      width: "10%",
      bottom: "40%",
      left: "12%",
      position: "absolute"
    },
    camera: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      overflow: "hidden",
      zIndex: 0,
    },
  })
  const handleBarCodeScanned = ({ type, data }: { type: any, data: any }) => {
    if (scanned) return;
    setScanned(true);

    if (data) setProduct(data);
    router.navigate("/(auth)/camera/customInput");
    setScanned(false);

  };
  return (
    <>
      <CameraView
        enableTorch={torch}
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }}
        videoQuality="720p"
        mute
        autofocus="on"
        facing={facing}
        onBarcodeScanned={handleBarCodeScanned}
      />
      <ThemedView style={styles.maskContainer} pointerEvents="none">
        <ThemedView style={styles.overlayTop} />
        <ThemedView style={styles.overlayBottom} />
        <ThemedView style={styles.overlayLeft} />
        <ThemedView style={styles.overlayRight} />
        <ThemedView style={styles.cutoutContainer}>
          <ThemedView style={styles.cutoutTopLeft} />
          <ThemedView style={styles.cutoutLeftTop} />
          <ThemedView style={styles.cutoutTopRight} />
          <ThemedView style={styles.cutoutRightTop} />
          <ThemedView style={styles.cutoutBottomLeft} />
          <ThemedView style={styles.cutoutLeftBottom} />
          <ThemedView style={styles.cutoutBottomRight} />
          <ThemedView style={styles.cutoutRightBottom} />
        </ThemedView>
      </ThemedView>
    </>
  )
}