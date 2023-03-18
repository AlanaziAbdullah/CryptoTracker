import { View, Text, Image } from "react-native";
import React from "react";
import { formatPercentage, formatPrice } from "../services/cryptoServices";
import { GlobalColors } from "../GlobalStyles";

export function AssetRow({ id, symbol, coins, image }) {
  return (
    <View
      style={{
        alignSelf: "center",
        width: "90%",
        flexDirection: "row",
        marginVertical: 6,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          backgroundColor: GlobalColors.colors.secondary,
          padding: 12,
          marginVertical: 6,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 15,
        }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>

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
          {String(symbol).toUpperCase()}
        </Text>
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: "#A8A7A7",
            fontSize: 13,
            fontWeight: "600",
          }}
        >
          {id}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: GlobalColors.colors.font,
            fontSize: 18,
            textAlign: "right",
          }}
        >
          {String(coins).substring(0, 6)}
        </Text>
      </View>
    </View>
  );
}
