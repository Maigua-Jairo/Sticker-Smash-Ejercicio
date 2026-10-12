import EpnColors from '@/constants/epn-colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
  
export default function RootLayout() {
  return (
<Tabs
  screenOptions={{
    tabBarActiveTintColor: EpnColors.primary,
    tabBarInactiveTintColor: EpnColors.secondaryText,
    headerStyle: {
      backgroundColor: EpnColors.header,
    },
    headerShadowVisible: false,
    headerTintColor: EpnColors.surface,
    tabBarStyle: {
      backgroundColor: EpnColors.surface,
      borderTopColor: EpnColors.border,
    },
  }}
>

  <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}