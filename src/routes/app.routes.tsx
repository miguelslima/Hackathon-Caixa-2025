import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import { Simulador } from "@/screens/Simulador";
import { Info } from "@/screens/Info";
import { ResultSimulator } from "@/screens/ResultSimulator";

import { useTheme } from "styled-components/native";
import RegisterProductScreen from "@/screens/RegisterProductScreen";
import ProductsScreen from "@/screens/ProductScreen";

export type RootBottomParamList = {
  Info: undefined;
  Simulador: undefined;
  ResultSimulator: { result: {} };
  Produtos: undefined
  RegisterProductScreen: undefined
};

const { Navigator, Screen } = createBottomTabNavigator<RootBottomParamList>();

export function AppRoutes() {
  const { COLORS } = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.CAIXA_YELLOW,
        tabBarInactiveTintColor: COLORS.CAIXA_BLANK,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.CAIXA_BLUE,
        }
      }}
    >
      <Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Produtos"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="file-plus" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Simulador"
        component={Simulador}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Screen
        name="ResultSimulator"
        component={ResultSimulator}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
        }}
      />
      <Screen
        name="RegisterProductScreen"
        component={RegisterProductScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
}
