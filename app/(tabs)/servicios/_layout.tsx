import { Stack } from 'expo-router';

export default function ServiciosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="solicitar/[id]" />
    </Stack>
  );
}