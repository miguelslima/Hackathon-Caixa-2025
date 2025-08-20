import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { ThemeProvider } from "styled-components/native";

import { Routes } from "./src/routes";
import { AuthProvider } from "./src/hooks/auth";

import theme from "./src/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {

        await new Promise(resolve => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      }
    }

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" translucent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#005CA9" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </SafeAreaView>
        </View>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
