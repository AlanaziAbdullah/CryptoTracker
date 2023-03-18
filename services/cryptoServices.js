import { useState } from "react";
import { AsyncStorage } from "react-native";

export function formatPercentage(percentage) {
  return String(percentage).charAt(0) === "-"
    ? `${String(percentage).substring(0, 4)}%`
    : `+${String(percentage).substring(0, 4)}%`;
}

export function formatPrice(price) {
  if (String(price).charAt(0) !== "0") {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedPrice;
  } else {
    return price;
  }
}

export function returnAssets(jsonValue) {}
