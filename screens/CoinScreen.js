import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from "axios";
import { formatPercentage, formatPrice } from "../services/cryptoServices";
import { ActionButton } from "../components/ActionButton";
import { GlobalColors } from "../GlobalStyles";

const CoinScreen = ({ route }) => {
  const coinName = String(route.params.coin.id).toLowerCase();
  const screenWidth = Dimensions.get("window").width;
  const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h`;

  const navigation = useNavigation();
  const coin = route.params.coin;

  const [selectedPeriod, setSelectedPeriod] = useState("12H");

  const raise = parseFloat(coin.price_change_percentage_24h) > 0;

  const prices = route.params.coin.sparkline_in_7d.price;

  const hoursChart = prices.slice(prices.length - 13, prices.length - 1);
  const dayChart = prices.slice(prices.length - 25, prices.length - 1);
  const weekChart = prices;

  const chart =
    selectedPeriod === "12H"
      ? hoursChart
      : selectedPeriod === "1D"
      ? dayChart
      : weekChart;

  const data = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: chart,
        color: (opacity = 1) =>
          raise ? `rgba(30, 200, 30, 1)` : `rgba(230, 30, 30, 1)`, // optional
        strokeWidth: selectedPeriod === "1W" ? 3 : 4, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#475259",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#475259",
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(255, 255, 255, 0)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    withDots: false,
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.colors.primary,
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: GlobalColors.colors.secondary,
            padding: 8,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: 20,
          }}
        >
          <Ionicons
            name="arrow-back"
            color={GlobalColors.colors.special}
            size={20}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: GlobalColors.colors.font,
            fontSize: 22,
            textAlign: "center",
          }}
        >
          {String(route.params.coin.id).toUpperCase()}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: GlobalColors.colors.secondary,
          width: 100,
          height: 100,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Image source={{ uri: coin.image }} style={{ width: 45, height: 45 }} />
      </View>
      <Text
        style={{
          fontFamily: "Ubunto-Regular",
          color: "#9f9f9f",
          fontSize: 20,
          marginTop: 15,
        }}
      >
        {`${coin.id} (${String(coin.symbol).toUpperCase()})`}
      </Text>

      <Text
        style={{
          fontFamily: "Ubunto-Regular",
          color: GlobalColors.colors.font,
          fontSize: 32,
          marginTop: 15,
        }}
      >
        ${formatPrice(coin.current_price)}
      </Text>

      <Text
        style={{
          fontFamily: "Ubunto-Regular",
          color:
            String(coin.price_change_percentage_24h).charAt(0) !== "-"
              ? "#51C851"
              : "#f10030",
          fontSize: 18,
          marginTop: 10,
        }}
      >
        {formatPercentage(coin.price_change_percentage_24h)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedPeriod("12H")}
          style={{
            width: 40,
            alignItems: "center",
            borderRadius: 3,
            borderWidth: 2,
            borderColor:
              selectedPeriod === "12H"
                ? GlobalColors.colors.special
                : "transparent",
            padding: 5,
            marginRight: 5,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              color: GlobalColors.colors.special,
            }}
          >
            12H
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedPeriod("1D")}
          style={{
            width: 40,
            alignItems: "center",
            borderRadius: 3,
            borderWidth: 2,
            borderColor:
              selectedPeriod === "1D"
                ? GlobalColors.colors.special
                : "transparent",
            padding: 5,
            marginRight: 5,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              color: GlobalColors.colors.special,
            }}
          >
            1D
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedPeriod("1W")}
          style={{
            width: 40,
            alignItems: "center",
            borderRadius: 3,
            borderWidth: 2,
            borderColor:
              selectedPeriod === "1W"
                ? GlobalColors.colors.special
                : "transparent",
            padding: 5,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              color: GlobalColors.colors.special,
            }}
          >
            1W
          </Text>
        </TouchableOpacity>
      </View>
      <LineChart
        yAxisLabel={"$"}
        style={{ marginTop: 30, left: -30 }}
        data={data}
        width={screenWidth}
        height={280}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (opacity = 0) => `rgba(255, 255, 255, 0)`,
          withVerticalLines: false,
          withHorizontalLines: false,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional
          propsForDots: {
            r: "0",
          },
        }}
        bezier
      />
      <View
        style={{
          alignSelf: "flex-start",
          padding: 20,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Ubunto-Regular",
              color: "#6A848B",
              fontSize: 17,
            }}
          >
            Last 24hr Volume
          </Text>
          <Text
            style={{
              fontFamily: "Ubunto-Regular",
              color: GlobalColors.colors.font,
              fontSize: 17,
              textAlign: "right",
            }}
          >
            ${formatPrice(coin.total_volume)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              fontFamily: "Ubunto-Regular",
              color: "#6A848B",
              fontSize: 17,
            }}
          >
            Market Cap
          </Text>
          <Text
            style={{
              fontFamily: "Ubunto-Regular",
              color: GlobalColors.colors.font,
              fontSize: 17,
              textAlign: "right",
            }}
          >
            ${formatPrice(coin.market_cap)}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <ActionButton navigation={navigation} buy={true} coin={coin} />
        <ActionButton navigation={navigation} buy={false} coin={coin} />
      </View>
    </SafeAreaView>
  );
};

export default CoinScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    position: "absolute",
    width: "80%",
    bottom: 50,
    justifyContent: "space-around",
  },
});
