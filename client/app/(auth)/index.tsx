import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AuthenticatedScreen() {
  const { scheme: colorScheme } = useTheme();
  const { userData } = useAuth();
  const { t } = useTranslation();
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
    settingGroup: {
      gap: 12,
    },
    title: {
      maxWidth: "80%",
      fontSize: 20
    },
    topBarContainer: {
      flexDirection: "column",
      gap: 17,
      color: Colors[colorScheme ?? "light"].text,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 24,
      fontSize: 16,
      backgroundColor: `${Colors[colorScheme ?? "light"].primary}70`,
    },
    topBar: {
      flexDirection: "column",
      gap: 12,
      color: Colors[colorScheme ?? "light"].text,
      backgroundColor: "white",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 24,
      fontSize: 16,
      overflow: "scroll",
      maxHeight: 180
    },
    topBarItem: {
      flexDirection: "row",
      width: "100%",
      padding: 12,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? "light"].border,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "space-between"
    },
    card: {
      width: 70,
      paddingVertical: 15,
      borderRadius: 25,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      marginHorizontal: 6,
      elevation: 1,
    },
    activeCard: {
      width: 70,
      paddingVertical: 15,
      borderRadius: 25,
      backgroundColor: Colors[colorScheme ?? "light"].primary,
      marginHorizontal: 6,
      elevation: 1,
    },
    cardTop: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: "center",
      paddingVertical: 2,
      paddingHorizontal: 5,
    },
  });

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [items, setItems] = useState<{ nameDay: string; numberDay: number; }[]>([]);
  const [offset, setOffset] = useState<number>();
  const nowYear = new Date().getFullYear() + 1;
  const nowMonth = new Date().getMonth() + 1;
  const nowDay = new Date().getDate();
  const nowDays = new Date(nowYear, nowMonth, 0).getDate();


  //E-hónap napjai
  //TODO: Késöbb a többi hónap is lehet majd
  useEffect(() => {
    const generatedItems = [];
    setSelectedDay(nowDay);

    for (let day = nowDay; day < nowDays; day++) {
      generatedItems.push(
        {
          nameDay: new Date(nowYear, nowMonth, day).toLocaleDateString("en-us", { weekday: "short" }),
          numberDay: day,
        }
      );
    }

    setItems(generatedItems);
  }, [])

  const lists = [
    {
      name: "Krumpli",
      amount: 2
    },
    {
      name: "Coca cola Zero"
    }
  ]

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.settingGroup}>
          <ThemedText type="title" style={styles.title}>
            {t("main.title")} {userData && userData.username}
          </ThemedText>
        </View>
        <ThemedView style={styles.topBarContainer}>
          <ThemedText style={{ fontSize: 15 }}>
            Bevásárlólista
          </ThemedText>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.topBar}>
            {/* */}
            {
              lists.map(({ name, amount }: { name: string; amount?: number }, idx: number) => (
                <ThemedView style={styles.topBarItem} key={idx}>
                  <ThemedText type="defaultSemiBold" style={{ fontSize: 15 }}>
                    {name}
                  </ThemedText>
                  <ThemedText style={{ fontSize: 12, color: Colors[colorScheme ?? "light"].text }}>
                    {amount ? amount : 1}x
                  </ThemedText>
                </ThemedView>
              ))
            }
            {/* */}
          </ScrollView>
        </ThemedView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: offset }}
        >
          {items && items.map(({ nameDay, numberDay }: { nameDay: string, numberDay: number }, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
          setSelectedDay(numberDay);
          setOffset(-(index * 76));
              }}>
              <View style={selectedDay === numberDay ? styles.activeCard : styles.card}>
          <View style={styles.cardTop}>
            <ThemedText type="defaultSemiBold">{nameDay}</ThemedText>
            <ThemedText>{numberDay}</ThemedText>
          </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView >
    </ThemedView >
  );
}
