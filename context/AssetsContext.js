// import { createContext, useState } from "react";
// import { Asset } from "../models/Asset";

// export const AssetsContext = createContext({
//   coins: [],
//   balance: 0,
//   buy: (id) => {},
//   sell: (id) => {},
// });

// export default function AssetsContextProvider({ children }) {
//   const [assets, setCoins] = useState([]);
//   const [balance, setBalance] = useState(0);

//   function buy(id, amount) {
//     const filtered = assets.filter((asset) => asset.id === id);
//     filtered.length < 1
//       ? setCoins((current) => [...current, new Asset(id, amount)])
//       : assets.find((asset) => asset.id === id).setAmount(amount);

//     console.log("ASSETS: " + assets);
//   }
// }
