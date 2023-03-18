import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CoinRow } from "../components/CoinRow";
import { CoinsContext } from "../context/CoinsContext";
import { useNavigation } from "@react-navigation/native";
import { GlobalColors } from "../GlobalStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const coinsContext = useContext(CoinsContext);
  const [searchResult, setSearchResult] = useState([]);
  const navigation = useNavigation();
  const data = coinsContext.coins;

  const time = new Date();
  const hour = time.getHours();

  const [updateTime, setUpdateTime] = useState(`${hour}:${time.getMinutes()}`);
  function handleInput(value) {
    setSearchValue(value);
  }

  function search(id) {
    console.log("searching for: " + id + " among " + data.length + " results");
    const filtered = data.filter(
      (coin) =>
        String(coin.symbol).includes(String(id).toLowerCase()) ||
        String(coin.id).includes(String(id).toLowerCase())
    );
    setSearchResult(filtered);
    console.log(searchResult.length);
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: GlobalColors.colors.primary, flex: 1 }}
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
            Search
          </Text>
        </View>

        <View></View>
      </View>

      {/* SEARCH INPUT */}
      <View
        style={{
          flexDirection: "row",
          width: "70%",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: GlobalColors.colors.secondary,
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#A29F9F",
          marginBottom: 30,
          marginTop: 10,
        }}
      >
        <TextInput
          style={{
            fontFamily: "Ubunto-Regular",
            fontSize: 20,
            flex: 1,
            color: GlobalColors.colors.font,
          }}
          selectionColor={GlobalColors.colors.font}
          onChangeText={(value) => handleInput(value)}
        />
        <TouchableOpacity onPress={() => search(searchValue)}>
          <Ionicons
            name="ios-search"
            size={24}
            color={GlobalColors.colors.special}
          />
        </TouchableOpacity>
      </View>

      <ScrollView flex={1}>
        <View style={{ flex: 1 }}>
          {searchResult.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={searchResult}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate("Coin", { coin: item })}
                  >
                    <CoinRow item={item} />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <Text
              style={{
                fontFamily: "Ubunto-Medium",
                alignSelf: "center",
                fontSize: 18,
                color: "#9f9f9f",
              }}
            >
              No results found...
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
