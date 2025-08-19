import React, { useEffect } from "react";
// import "intl";
// import "intl/locale-data/jsonp/pt-BR";
import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { ThemeProvider } from "styled-components/native";

import { Routes } from "./src/routes";
import { AuthProvider } from "./src/hooks/auth";

import theme from "./src/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (fontsLoaded) {
    setTimeout(SplashScreen.hideAsync, 1500);
    // SplashScreen.hideAsync();
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
