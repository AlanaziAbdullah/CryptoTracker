import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalColors } from "../GlobalStyles";

export function ActionButton({ coin, navigation, buy }) {
  return (
    <TouchableOpacity
      onPress={() => {
        buy
          ? navigation.navigate("Add", {
              coin: coin,
            })
          : "";
      }}
      style={{
        backgroundColor: buy ? "#51C851" : "#f10030",
        width: "45%",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "Ubunto-Bold",
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {buy ? "Buy" : "Sell"}
      </Text>
    </TouchableOpacity>
  );
}
