import { View, Text, Image } from "react-native";
import React from "react";
import { formatPercentage, formatPrice } from "../services/cryptoServices";
import { GlobalColors } from "../GlobalStyles";

export function CoinRow(props) {
  return (
    <View
      style={{
        alignSelf: "center",
        width: "90%",
        flexDirection: "row",
        backgroundColor: GlobalColors.colors.secondary,
        padding: 20,
        marginVertical: 6,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: props.item.image,
        }}
        style={{
          width: 40,
          height: 40,
          marginRight: 10,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: GlobalColors.colors.font,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {String(props.item.symbol).toUpperCase()}
        </Text>
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: "#A8A7A7",
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          {props.item.id}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: GlobalColors.colors.font,
            fontSize: 18,
            fontWeight: "600",
            textAlign: "right",
          }}
        >
          ${formatPrice(props.item.current_price)}
        </Text>
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color:
              String(props.item.price_change_percentage_24h).charAt(0) !== "-"
                ? "#51C851"
                : "#f10030",
            fontSize: 13,
            fontWeight: "600",
            textAlign: "right",
          }}
        >
          {formatPercentage(props.item.price_change_percentage_24h)}
        </Text>
      </View>
    </View>
  );
}
