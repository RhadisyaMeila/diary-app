// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { DancingScript_400Regular, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import { Sacramento_400Regular } from '@expo-google-fonts/sacramento';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'DancingScript-Regular': DancingScript_400Regular,
    'DancingScript-Bold': DancingScript_700Bold,
    'Sacramento-Regular': Sacramento_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // Return null while fonts are loading
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Add other screens if needed */}
    </Stack>
  );
}
