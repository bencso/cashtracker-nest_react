import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import getAuthenticatedIndexStyles from "@/styles/authenticatedIndex";
import getNavbarStyles from "@/styles/navbar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function AuthenticatedScreen() {
  const { scheme: colorScheme } = useTheme();
  const { userData, loadAuth } = useAuth();
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [items, setItems] = useState<{ nameDay: string; numberDay: number; }[]>([]);
  const [offset, setOffset] = useState<number>();

  const nowYear = new Date().getFullYear() + 1;
  const nowMonth = new Date().getMonth() + 1;
  const nowDay = new Date().getDate();
  const nowDays = new Date(nowYear, nowMonth, 0).getDate();

  const styles = getAuthenticatedIndexStyles({ colorScheme });
  const navbarStyles = getNavbarStyles({colorScheme});

  useEffect(() => {
    loadAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
  }, [nowDay, nowDays, nowMonth, nowYear])

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
      <View style={{...navbarStyles.navbar,backgroundColor: `${Colors[colorScheme ?? "light"].tabIconDefault}`}}>
            <ThemedText type="title" style={{...navbarStyles.title,color: `${Colors[colorScheme ?? "light"].background}`,}}>
              {t("main.title")}
            </ThemedText>
            <ThemedText type="subtitle" style={{...navbarStyles.title,color: `${Colors[colorScheme ?? "light"].background}`,}}>
              {userData && userData.username}
            </ThemedText>
          </View>
      <ThemedView style={styles.content}>
        <View style={styles.settingGroup}>
          <ThemedView style={styles.topBar}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* */}
              {
                lists.map(({ name, amount }: { name: string; amount?: number }, idx: number) => (
                  <ThemedView style={styles.topBarItem} key={idx}>
                    <View style={styles.flexRow}>
                      <View style={styles.topBarItemPicture} >
                        <ThemedText style={{
                          color: "white",
                          fontSize: 30
                        }}>{name.at(0)}</ThemedText>
                      </View>
                      <ThemedText type="defaultSemiBold" style={{ fontSize: 17 }}>
                        {name}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.amountText}>
                      {amount ? amount : 1}x
                    </ThemedText>
                  </ThemedView>
                ))
              }
              {/* */}
            </ScrollView>
          </ThemedView>
        </View>
        <View>
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
                  setOffset(0);
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
        </View>
      </ThemedView >
    </ThemedView >
  );
}
