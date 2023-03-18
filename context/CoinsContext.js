import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { Asset } from "../models/Asset";

export const CoinsContext = createContext({
  coins: [],
  assets: [AsyncStorage.getItem("@assets")],
  transactions: 0,
  balance: 0,
  set: (coins) => {},
  updateAssets: (id) => {},
  addTransaction: () => {},
});

export default function CoinsContextProvider({ children }) {
  const [coins, setCoins] = useState([]);

  //===================== COINS
  function set(coins) {
    setCoins(coins);
  }

  //===================== ASSETS
  //FIXME:
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState(0);

  function addTransaction() {
    setTransactions((transactions) => transactions + 1);
    console.log("TRIGGERED -> " + transactions);
  }

  function updateAssets(asset) {
    setAssets(asset);
  }

  var total = 0;
  assets.forEach((asset) => {
    try {
      total += parseFloat(
        asset.coins *
          parseFloat(
            coins.filter((coin) => coin.id === asset.id)[0].current_price
          )
      );
    } catch (e) {
      console.log("NOT LOADED YET");
    }
  });

  const values = {
    coins: coins,
    assets: assets,
    transactions: transactions,
    balance: parseFloat(total).toFixed(2),
    set: set,
    updateAssets: updateAssets,
    addTransaction: addTransaction,
  };
  return (
    <CoinsContext.Provider value={values}>{children}</CoinsContext.Provider>
  );
}
