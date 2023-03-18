import { Crypto } from "../models/Crypto";

const BTC = new Crypto(
  "Bitcoin",
  "BTC",
  require("../assets/images/btc.png"),
  21400,
  2.45
);
const ETH = new Crypto(
  "Ethereum",
  "ETH",
  require("../assets/images/eth.png"),
  1567,
  3.67
);
const TRX = new Crypto(
  "Tron",
  "TRX",
  require("../assets/images/trx.png"),
  1.651,
  4.56
);
const BNB = new Crypto(
  "BNB",
  "BNB",
  require("../assets/images/bnb.png"),
  214,
  1.35
);
const LTC = new Crypto(
  "Litecoin",
  "LTC",
  require("../assets/images/ltc.png"),
  31.3,
  2.57
);
const XRP = new Crypto(
  "Ripple",
  "XRP",
  require("../assets/images/xrp.png"),
  1.56,
  4.56
);

export const cryptos = [BTC, ETH, TRX, BNB, LTC, XRP];
