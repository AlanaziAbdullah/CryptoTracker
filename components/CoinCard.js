import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { formatPrice } from "../services/cryptoServices";
import { GlobalColors } from "../GlobalStyles";

export function CoinCard({ item }) {
  const chartConfig = {
    backgroundGradientFrom: "#475259",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#475259",
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(255, 255, 255, 0)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [28, 80, 99, 43, 45, 45, 28, 43, 99, 43, 20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  const symbol = String(item.symbol).toUpperCase();
  const price = item.current_price;
  const percent = item.price_change_percentage_24h;
  const raise = String(percent).charAt(0) !== "-" ? true : false;

  return (
    <View
      key={symbol}
      style={{
        marginLeft: 15,
        padding: 20,
        width: 190,
        height: 190,
        backgroundColor: GlobalColors.colors.secondary,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <Image source={{ uri: item.image }} style={{ width: 40, height: 40 }} />

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              color: GlobalColors.colors.font,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {symbol}
          </Text>
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              color: "#A8A7A7",
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            {item.id}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: "Ubunto-Medium",
          color: GlobalColors.colors.font,
          fontSize: 24,
          fontWeight: "700",
        }}
      >
        ${formatPrice(item.current_price)}
      </Text>
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: raise ? "#51C851" : "#EC1E1E",
          padding: 5,
          borderRadius: 5,
          width: "55%",
        }}
      >
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: "white",
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          <Ionicons name={raise ? "caret-up" : "caret-down"} />{" "}
          {String(item.price_change_percentage_24h).substring(0, 4)}%
        </Text>
      </View>
    </View>
  );
}
