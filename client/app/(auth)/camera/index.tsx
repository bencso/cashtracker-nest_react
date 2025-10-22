import Button from "@/components/button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "react-i18next";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from "react";
import { Linking } from "react-native";
import { router } from "expo-router";
import { usePantry } from "@/contexts/pantry-context";
import { cameraOverlayStyles, cameraStyles } from "@/styles/camera";

export default function CameraScreen() {
  const { scheme: colorScheme } = useTheme();
  const { t } = useTranslation();
  const { setProduct } = usePantry();
  const facing = "back";
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState<boolean>(false);

  const styles = cameraStyles({ colorScheme });

  if (!permission) {
    return <ThemedView style={styles.content}>
    </ThemedView>
  }

  if (!permission.granted) {
    if (permission.canAskAgain)
      return (
        <ThemedView style={styles.content}>
          <ThemedText type="title">{t("camera.permission.title")}</ThemedText>
          <ThemedText>{t("camera.permission.description")}</ThemedText>
          <Button action={requestPermission} icon="camera" label={t("camera.permission.cta")} />
        </ThemedView>
      );


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
    <ThemedView style={styles.content}>
      <CameraOverlay facing={facing} torch={torch} />
      <ThemedView style={styles.cameraTools}>
        <Button icon={torch ? "flashlight" : "flashlight-off"} label="" chevron={false} coloredIcon action={() => {
          setTorch(!torch);
        }} />
        <Button icon={"pen"} label={t("inventory.camera.custominput")} chevron={false} coloredIcon action={() => {
          setProduct(null);
          router.navigate("/(auth)/camera/customInput");
        }} />
      </ThemedView>
    </ThemedView>
  </ThemedView>;
}


function CameraOverlay({
  torch,
  facing
}: {
  torch: any;
  facing: any;
}) {
  const { setProduct, scanned, setScanned } = usePantry();

  const styles = cameraOverlayStyles;

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    if (data) setProduct(data);
    router.navigate("/(auth)/camera/customInput");
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
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
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