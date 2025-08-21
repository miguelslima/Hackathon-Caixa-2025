import { useCallback, useEffect } from "react";
import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { ThemeProvider } from "styled-components/native";

import theme from "./src/theme";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/hooks/auth";

import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function prepareApp() {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    prepareApp();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" translucent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          onLayout={onLayoutRootView}
          style={{ flex: 1, backgroundColor: "#005CA9" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <AuthProvider>
              <Routes />
              <Toast />
            </AuthProvider>
          </SafeAreaView>
        </View>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
