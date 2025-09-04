import React from 'react';
import { Tabs } from 'expo-router';
import {
  HomeIcon,
  Shield,
  MapPin,
  CreditCard,
  User,
} from 'lucide-react-native';
import { darkTheme } from '@/theme/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkTheme.colors.surfaceNavigation,
          borderTopColor: darkTheme.colors.outline,
          borderTopWidth: 0.5,
          height: 82,
          paddingBottom: 6,
          paddingTop: -12,
        },
        tabBarActiveTintColor: darkTheme.colors.primary,
        tabBarInactiveTintColor: darkTheme.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="servicios"
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, size }) => (
            <Shield size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <MapPin size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="pagos"
        options={{
          title: 'Pagos',
          tabBarIcon: ({ color, size }) => (
            <CreditCard size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}
