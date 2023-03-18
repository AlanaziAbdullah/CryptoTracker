import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { formatPrice } from "../services/cryptoServices";
import { CoinsContext } from "../context/CoinsContext";
import { cryptos } from "../data/list-of-currencies";
import { CoinRow } from "../components/CoinRow";
import { AssetRow } from "../components/AssetRow";
import { GlobalColors } from "../GlobalStyles";

const WalletScreen = () => {
  const coinsContext = useContext(CoinsContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: GlobalColors.colors.primary,
        paddingTop: 40,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          marginVertical: "5%",
        }}
      >
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              fontSize: 20,
              color: GlobalColors.colors.special,
            }}
          >
            My Wallet
          </Text>
        </View>

        <View></View>
      </View>
      <View flex={1}>
        <View
          style={{
            backgroundColor: GlobalColors.colors.secondary,
            width: "90%",
            paddingHorizontal: 25,
            paddingVertical: 65,
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 8,
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Text
            style={{
              fontFamily: "Ubunto-Regular",
              fontSize: 18,
              color: GlobalColors.colors.font,
            }}
          >
            Total Balance
          </Text>
          <Text
            style={{
              fontFamily: "Ubunto-Medium",
              fontSize: 32,
              color: GlobalColors.colors.font,
              fontWeight: "700",
              marginVertical: 5,
            }}
          >
            ${formatPrice(coinsContext.balance)}
          </Text>
          {/* <Text style={{ fontSize: 14, color: "#00ff00" }}>+2.45%</Text> */}
        </View>
      </View>
      <View flex={2} style={{ paddingHorizontal: 20, paddingTop: 40 }}>
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            fontSize: 24,
            color: GlobalColors.colors.font,
          }}
        >
          Assets
        </Text>
        <View style={{}}>
          {coinsContext.assets.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={coinsContext.assets}
              keyExtractor={(item) => item.id + Math.random()}
              renderItem={({ item }) => {
                return (
                  <AssetRow
                    id={item.id}
                    symbol={item.symbol}
                    coins={item.coins}
                    image={item.image}
                  />
                );
              }}
            />
          ) : (
            <Text
              style={{
                color: "#555",
                fontSize: 18,
                backgroundColor: "#fdfdfd",
                padding: 20,
                borderRadius: 10,
                marginVertical: 5,
              }}
            >
              NO ASSETS
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
