import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ScrollViewBase,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { cryptos } from "../data/list-of-currencies";
import { CoinCard } from "../components/CoinCard";
// import { getAllCoins } from "./services/cryptoServices";
import axios from "axios";
import { CoinRow } from "../components/CoinRow";
import { CoinsContext } from "../context/CoinsContext";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { formatPrice, saveAsset } from "../services/cryptoServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, GlobalColors } from "../GlobalStyles";

const Home = () => {
  const navigation = useNavigation();
  const time = new Date();
  const hour = time.getHours();
  const [data, setData] = useState([]);
  const coinsContext = useContext(CoinsContext);
  const [updateTime, setUpdateTime] = useState(`${hour}:${time.getMinutes()}`);
  const [renders, setRenders] = useState(5);

  const [assets, setAssets] = useState([]);

  const flag = coinsContext.transactions;

  const getAllCoins = async () => {
    const configurationObject = {
      method: "get",
      url:
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=24h",
    };
    try {
      console.log("GETTING DATA");
      const response = await axios(configurationObject);
      setData(response.data);
      coinsContext.set(response.data);
      console.log("Got All Data");
      setUpdateTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
      loadAssets();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     loadAssets();
  //   }, 10000);
  // });

  useEffect(() => {
    getAllCoins();
    console.log("TOTAL: " + coinsContext.balance);
  }, []);

  useEffect(() => {
    console.log("||||||||||||||||||||");
    loadAssets();
  }, []);

  //==============================
  const loadAssets = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@assets");
      if (jsonValue != null) {
        setAssets(JSON.parse(jsonValue));
        coinsContext.updateAssets(assets);
        console.log("MY ARRAY: " + coinsContext.assets.length);
        assets.forEach((asset) => {
          console.log(asset.id + " ---> " + asset.coins);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  //==============================

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  //#383856
  return (
    <>
      <StatusBar style={GlobalColors.colors.statusbar} />
      <SafeAreaView
        horizontal={false}
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: GlobalColors.colors.primary,
        }}
      >
        {/* BODY */}
        <ScrollView>
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: "10%",
            }}
          >
            <FontAwesome5
              name="bitcoin"
              size={45}
              color={GlobalColors.colors.special}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={{
                  fontFamily: "Ubunto-Bold",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: GlobalColors.colors.font,
                }}
              >
                {hour < 12 ? "Good Morning" : "Good Evening"}
              </Text>
              <Text
                style={{
                  fontFamily: "Ubunto-Regular",
                  fontSize: 18,
                  fontWeight: "600",
                  color: GlobalColors.colors.font,
                }}
              >
                Abdullah!
              </Text>
            </View>

            <View>
              <View
                style={{
                  borderRadius: 100,
                  padding: 10,
                  backgroundColor: GlobalColors.colors.secondary,
                  borderWidth: 1,
                  borderColor: "#D6CACA",
                }}
              >
                <TouchableOpacity onPress={() => getAllCoins()}>
                  <Feather
                    name="refresh-ccw"
                    size={24}
                    color={GlobalColors.colors.special}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: "Ubunto-Medium",
                  fontSize: 12,
                  color: "#999",
                  textAlign: "center",
                }}
              >
                {updateTime}
              </Text>
            </View>
          </View>

          {/* BALANCE CARD */}
          <View>
            <View
              style={{
                justifyContent: "center",
                paddingHorizontal: 20,
                marginBottom: "10%",
              }}
            >
              <Text
                style={{
                  fontFamily: "Ubunto-Regular",
                  color: GlobalColors.colors.font,
                  fontSize: 15,
                }}
              >
                Balance
              </Text>
              <Text
                style={{
                  fontFamily: "Ubunto-Medium",
                  color: GlobalColors.colors.font,
                  fontSize: 34,
                  fontWeight: "700",
                  paddingVertical: 15,
                }}
              >
                ${formatPrice(coinsContext.balance)}
              </Text>
            </View>
          </View>

          {/* YOUR CURRENCIES */}

          <View>
            <Text
              style={{
                fontFamily: "Ubunto-Medium",
                textAlign: "left",
                alignSelf: "flex-start",
                color: GlobalColors.colors.font,
                fontSize: 22,
                paddingLeft: 20,
                marginBottom: 0,
                alignItems: "center",
              }}
            >
              Top Coins
              {/* <Ionicons
                name="logo-bitcoin"
                size={24}
                color={GlobalColors.colors.special}
              /> */}
            </Text>
            <View style={{}}>
              {data.length > 0 ? (
                <FlatList
                  style={{
                    paddingVertical: 20,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={data.slice(0, 5)}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Coin", { coin: item })
                        }
                      >
                        <CoinCard item={item} />
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <FlatList
                  style={{
                    paddingVertical: 20,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={cryptos}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    return (
                      <View
                        key={item.symbol}
                        style={{
                          marginLeft: 15,
                          padding: 20,
                          width: 190,
                          height: 190,
                          backgroundColor: GlobalColors.colors.secondary,
                          borderRadius: 10,
                        }}
                      ></View>
                    );
                  }}
                />
              )}
            </View>
          </View>

          {/* ALL CRYPTOS */}

          <View>
            <Text
              style={{
                fontFamily: "Ubunto-Medium",
                textAlign: "left",
                alignSelf: "flex-start",
                color: GlobalColors.colors.font,
                fontSize: 22,
                paddingLeft: 20,
                marginTop: 40,
                marginBottom: 15,
              }}
            >
              All Coins
            </Text>
            <View style={{}}>
              {data.length > 1 ? (
                <FlatList
                  scrollEnabled={false}
                  data={data.slice(0, renders)}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() =>
                          navigation.navigate("Coin", { coin: item })
                        }
                      >
                        <CoinRow item={item} />
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <FlatList
                  style={{
                    paddingVertical: 20,
                  }}
                  data={cryptos}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          alignSelf: "center",
                          width: "90%",
                          flexDirection: "row",
                          backgroundColor: GlobalColors.colors.secondary,
                          padding: 40,
                          marginVertical: 6,
                          borderRadius: 10,
                          alignItems: "center",
                        }}
                      />
                    );
                  }}
                />
              )}
              {renders < coinsContext.coins.length ? (
                <TouchableOpacity
                  onPress={() => {
                    renders + 5 > coinsContext.coins.length
                      ? setRenders(coinsContext.coins.length)
                      : setRenders(renders + 5);
                  }}
                  style={{
                    marginTop: 20,
                    alignSelf: "center",
                    padding: 20,
                    backgroundColor: GlobalColors.colors.secondary,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Ubunto-Regular",
                      color: "#9F9F9F",
                    }}
                  >
                    Show More
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setRenders(5)}
                  style={{
                    marginTop: 20,
                    alignSelf: "center",
                    padding: 20,
                    backgroundColor: GlobalColors.colors.secondary,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Ubunto-Regular",
                      color: "#9F9F9F",
                    }}
                  >
                    Show Less
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
