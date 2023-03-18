import { View, Text, Image } from "react-native";
import React from "react";
import { GlobalColors } from "../GlobalStyles";

export function ExchangeCoin(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        // backgroundColor: "#495D64",
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: GlobalColors.colors.primary,
          width: "100%",
          borderRadius: 25,
          alignItems: "center",
          padding: 5,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: "row",
            backgroundColor: GlobalColors.colors.secondary,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "flex-start",
            width: "40%",
          }}
        >
          <Image
            source={{
              uri: props.coin.image,
            }}
            style={{
              width: 50,
              height: 50,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              color: GlobalColors.colors.font,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {String(props.coin.symbol).toUpperCase()}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Ubunto-Regular",
            fontSize: 24,
            color: GlobalColors.colors.font,
            flex: 1,
            paddingLeft: 20,
          }}
        >
          {props.exchangeAmount}
        </Text>
      </View>
    </View>
  );
}
