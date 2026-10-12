import EpnColors from '@/constants/epn-colors';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return( 
    <>
  <Stack screenOptions={{
    contentStyle: { backgroundColor: EpnColors.background },
    headerStyle: { backgroundColor: EpnColors.header },
    headerTintColor: EpnColors.surface,
  }}>
    <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
  </Stack >
  <StatusBar style='light'/>
  </>
  );
}
