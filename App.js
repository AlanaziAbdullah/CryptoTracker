import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import CoinScreen from "./screens/CoinScreen";
import AddCoinScreen from "./screens/AddCoinScreen";
import SearchScreen from "./screens/SearchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CoinsContextProvider from "./context/CoinsContext";
import WalletScreen from "./screens/WalletScreen";
import { GlobalColors } from "./GlobalStyles";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <CoinsContextProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
          tabBarActiveTintColor: GlobalColors.colors.special,
          tabBarInactiveTintColor: "#9F9F9F",
          tabBarStyle: {
            backgroundColor: GlobalColors.colors.primary,
            borderTopWidth: 0,
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    </CoinsContextProvider>
  );
}

export default function App() {
  const [loaded] = useFonts({
    "Ubunto-Light": require("./assets/fonts/Ubuntu-Light.ttf"),
    "Ubunto-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubunto-Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
    "Ubunto-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <CoinsContextProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Coin" component={CoinScreen} />

          <Stack.Screen
            name="Add"
            component={AddCoinScreen}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </CoinsContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
