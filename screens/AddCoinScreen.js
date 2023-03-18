import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { formatPrice } from "../services/cryptoServices";
import { ActionButton } from "../components/ActionButton";
import { ExchangeCoin } from "./ExchangeCoin";
import { useNavigation } from "@react-navigation/native";
import { CoinsContext } from "../context/CoinsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalColors } from "../GlobalStyles";
import { Feather } from "@expo/vector-icons";

const AddCoinScreen = ({ route }) => {
  const navigation = useNavigation();
  const coin = route.params.coin;
  const [amount, setAmount] = useState("");
  const [exchangedAmount, setExchangedAmount] = useState(0);
  const coinsContext = useContext(CoinsContext);
  const assets = coinsContext.assets;

  function handleAmount(input) {
    String(input).length > 0 ? setAmount(parseFloat(input)) : setAmount("");
    setExchangedAmount(amount / coin.current_price);
  }

  function add(number) {
    setAmount((current) => String(current) + number);
  }

  function deleteNumber() {
    setAmount(amount.substring(0, amount.length - 1));
  }

  //=================================
  const saveAsset = async () => {
    console.log(
      "Buying " +
        String(parseFloat(amount) / parseFloat(coin.current_price)).substring(
          0,
          10
        ) +
        " of " +
        coin.id
    );

    const newAsset = {
      id: coin.id,
      symbol: coin.symbol,
      coins: String(amount / parseFloat(coin.current_price)).substring(0, 10),
      image: coin.image,
    };

    console.log("Created New Asset: " + newAsset.id);
    const updatedAssets = [...assets, newAsset];
    try {
      await AsyncStorage.setItem("@assets", JSON.stringify(updatedAssets));

      console.log("======== ADDED ========");

      coinsContext.updateAssets(updatedAssets);
      coinsContext.addTransaction();
      console.log("======== SUCCESS ======");
    } catch (e) {
      console.error(e);
    }
  };
  //=================================

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: GlobalColors.colors.secondary,
        alignItems: "center",
        padding: 30,
      }}
    >
      <Text
        style={{
          fontFamily: "Ubunto-Medium",
          color: GlobalColors.colors.font,
          fontSize: 24,
        }}
      >
        Buy {String(coin.symbol).toUpperCase()}
      </Text>
      <Text
        style={{
          fontFamily: "Ubunto-Regular",
          alignSelf: "flex-start",
          fontSize: 18,
          color: "#9f9f9f",
          marginTop: 40,
          marginBottom: 10,
        }}
      >
        From
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: GlobalColors.colors.primary,
            padding: 5,
            width: "100%",
            borderRadius: 25,
            alignItems: "center",
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
                uri:
                  "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
              }}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <Text
              style={{
                fontFamily: "Ubunto-Medium",
                color: GlobalColors.colors.font,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              USDT
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Ubunto-Regular",
              fontSize: 24,
              color: "gray",
              flex: 1,
              paddingLeft: 20,
            }}
          >
            {amount}
          </Text>
          {/* <TextInput
            keyboardType="numeric"
            onChangeText={(value) => handleAmount(value)}
            placeholder="AMOUNT"
            placeholderTextColor={"#A9A9A9"}
            style={{
              fontSize: 24,
              color: GlobalColors.colors.font,
              flex: 1,
              paddingLeft: 20,
            }}
          ></TextInput> */}
        </View>
      </View>
      <Text
        style={{
          fontFamily: "Ubunto-Regular",
          alignSelf: "flex-start",
          fontSize: 18,
          color: "#9f9f9f",
          marginTop: 40,
          marginBottom: 10,
        }}
      >
        To
      </Text>
      <ExchangeCoin
        coin={coin}
        exchangeAmount={
          amount === 0 ||
          (String(amount).charAt(0) === "0" &&
            String(amount).charAt(0) === ".") ||
          String.valueOf(amount).length < 1
            ? ""
            : String(amount / parseFloat(coin.current_price)).substring(0, 10)
        }
      ></ExchangeCoin>
      <Text
        style={{
          fontFamily: "Ubunto-Regular",
          alignSelf: "flex-start",
          fontSize: 14,
          color: "#9f9f9f",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        current price: 1 {String(coin.symbol).toUpperCase()} ={" "}
        {formatPrice(coin.current_price)} USD
      </Text>
      {/* =============================================== */}
      <View
        style={{
          width: "100%",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => add(1)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => add(2)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => add(3)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              3
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => add(4)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => add(5)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => add(6)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              6
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => add(7)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => add(8)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => add(9)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              9
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => add(".")}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              .
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => add(0)}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 30,
            }}
          >
            <Text
              style={{
                fontFamily: "Ubunto-Regular",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onLongPress={() => setAmount("")}
            onPress={() => deleteNumber()}
            style={{
              // flex: 1,
              width: 70,
              height: 70,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              backgroundColor: GlobalColors.colors.primary,
              borderRadius: 100,
              marginRight: 5,
            }}
          >
            <Feather name="delete" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* =============================================== */}
      <TouchableOpacity
        onPress={() => {
          saveAsset(coin.id, amount);
          navigation.goBack();
        }}
        style={{
          backgroundColor: "#48B148",
          width: "65%",
          alignItems: "center",
          paddingVertical: 15,
          borderRadius: 10,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontFamily: "Ubunto-Medium",
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Buy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCoinScreen;
