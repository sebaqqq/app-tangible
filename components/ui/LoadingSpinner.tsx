import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { darkTheme } from '@/theme/theme';

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = 'Cargando...' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={darkTheme.colors.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.colors.background,
    gap: 16,
  },
  text: {
    color: darkTheme.colors.onSurface,
    fontSize: 16,
  },
});