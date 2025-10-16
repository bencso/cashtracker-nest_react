import Button from "@/components/button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "react-i18next";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function CameraScreen() {
  const { scheme: colorScheme } = useTheme();
  const { userData } = useAuth();
  const { t } = useTranslation();
  const facing = "back";
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string | null>(null);

  if (!permission) {
    return <ThemedView>
    </ThemedView>;
  }

  if (!permission.granted) {
    return (
      <ThemedView>
        <ThemedText>Nem rendelkezik megfelelő kamera engedéllyel.</ThemedText>
        <Button action={requestPermission} icon="camera" label="Engedélykérés" />
      </ThemedView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
    },
    content: {
      flex: 1,
      padding: 16,
      gap: 12,
      paddingTop: 100,
    },
    buttons: {
      flexDirection: "row",
      alignItems: "center",
      color: Colors[colorScheme ?? "light"].text,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].neutral + "CC",
      borderRadius: 12,
      fontSize: 16,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}10`,
    },
    camera: {
      flex: 1,
      position: "absolute",
      top: 0,
      left: 0,
      height: "120%",
      width: "120%",
      zIndex: 0
    },
    settingGroup: {
      gap: 12,
    },
    title: {
      maxWidth: "80%",
    },
    cameraTools: {
      position: "absolute",
      zIndex: 20,
      bottom: 120,
      alignSelf: "center",
      backgroundColor: `${Colors[colorScheme ?? "light"].text}`,
      borderRadius: 12,
    }, 
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
      height: '30%',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    overlayBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '30%',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    overlayLeft: {
      position: 'absolute',
      top: '30%',
      bottom: '30%',
      left: 0,
      width: '10%',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    overlayRight: {
      position: 'absolute',
      top: '30%',
      bottom: '30%',
      right: 0,
      width: '10%',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    cutout: {
      position: 'absolute',
      top: '30%',
      bottom: '30%',
      left: '10%',
      right: '10%',
      borderColor: Colors[colorScheme ?? "light"].text,
      borderWidth: 2,
      backgroundColor: "transparent",
    },
  });

  return <ThemedView style={styles.container}>

    {
      barcode === null && <ThemedView style={styles.content}>
        <CameraView enableTorch={torch} style={styles.camera} barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8"],
        }} videoQuality="480p" mute autofocus="on" facing={facing} onBarcodeScanned={({ data }) => {
          setBarcode(data);
        }} />
        <ThemedView style={styles.maskContainer} pointerEvents="none">
          <ThemedView style={styles.overlayTop} />
          <ThemedView style={styles.overlayBottom} />
          <ThemedView style={styles.overlayLeft} />
          <ThemedView style={styles.overlayRight} />
          <ThemedView style={styles.cutout} />
        </ThemedView>
        <ThemedView style={styles.cameraTools}>
          <Button icon={torch ? "flashlight" : "flashlight-off"} label="" chevron={false} coloredIcon action={() => {
            setTorch(!torch);
          }} />
        </ThemedView>
      </ThemedView>
    }
    {
      barcode !== null && <ThemedView style={styles.content}>
        <ThemedText>
          {barcode}
        </ThemedText>
        <Button label="Új" icon="plus" chevron action={() => {
          setBarcode(null)
        }} />
      </ThemedView>
    }
  </ThemedView>;
}
