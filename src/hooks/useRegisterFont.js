import React, { useCallback, } from "react";
import { useFonts } from 'expo-font';

const useRegisterFont = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Thin': require('../assets/fonts/Inter/Inter-Thin.ttf'),
    'Inter-ExtraLight': require('../assets/fonts/Inter/Inter-ExtraLight.ttf'),
    'Inter-Light': require('../assets/fonts/Inter/Inter-Light.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('../assets/fonts/Inter/Inter-ExtraBold.ttf'),
    'Inter-Black': require('../assets/fonts/Inter/Inter-Black.ttf'),
    'Laila-Light': require('../assets/fonts/Laila/Laila-Light.ttf'),
    'Laila-Regular': require('../assets/fonts/Laila/Laila-Regular.ttf'),
    'Laila-Medium': require('../assets/fonts/Laila/Laila-Medium.ttf'),
    'Laila-SemiBold': require('../assets/fonts/Laila/Laila-SemiBold.ttf'),
    'Laila-Bold': require('../assets/fonts/Laila/Laila-Bold.ttf'),
    'Laginchy-Bold': require('../assets/fonts/Laginchy/Laginchy-Bold.ttf'),
    'Laginchy-Regular': require('../assets/fonts/Laginchy/Laginchy-Regular.ttf'),
    'EncodeSans-Thin': require('../assets/fonts/EncodeSans/EncodeSans-Thin.ttf'),
    'EncodeSans-ExtraLight': require('../assets/fonts/EncodeSans/EncodeSans-ExtraLight.ttf'),
    'EncodeSans-Light': require('../assets/fonts/EncodeSans/EncodeSans-Light.ttf'),
    'EncodeSans-Regular': require('../assets/fonts/EncodeSans/EncodeSans-Regular.ttf'),
    'EncodeSans-Medium': require('../assets/fonts/EncodeSans/EncodeSans-Medium.ttf'),
    'EncodeSans-SemiBold': require('../assets/fonts/EncodeSans/EncodeSans-SemiBold.ttf'),
    'EncodeSans-Bold': require('../assets/fonts/EncodeSans/EncodeSans-Bold.ttf'),
    'EncodeSans-ExtraBold': require('../assets/fonts/EncodeSans/EncodeSans-ExtraBold.ttf'),
    'EncodeSans-Black': require('../assets/fonts/EncodeSans/EncodeSans-Black.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded;
};

export default useRegisterFont;