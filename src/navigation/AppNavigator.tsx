import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import CRMScreen from '../screens/crm/CRMScreen';
import HomeScreen from '../screens/HomeScreen';
import OffersScreen from '../screens/offers/OffersScreen';
import ReservationsScreen from '../screens/reservations/ReservationsScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import { useTheme } from '../shared/theme/useTheme';
import AccountScreen from '../screens/settings/AccountScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import AppearanceScreen from '../screens/settings/AppearanceScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';

export type MainTabParamList = {
  Home: undefined;
  Offers: undefined;
  Reservations: undefined;
  CRM: undefined;
  Analytics: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  UserSettings: undefined;
  AccountScreen: undefined;
  NotificationsScreen: undefined;
  AppearanceScreen: undefined;
  SecurityScreen: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabsNavigator() {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Offers') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Reservations') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'CRM') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? colors.surface : '#FFFFFF',
          borderTopColor: colors.border,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Reservations" component={ReservationsScreen} />
      <Tab.Screen name="CRM" component={CRMScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
      <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="AppearanceScreen" component={AppearanceScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
    </Stack.Navigator>
  );
}
