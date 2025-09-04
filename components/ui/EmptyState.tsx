import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { darkTheme, spacing } from '@/theme/theme';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonPress?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  buttonText,
  onButtonPress,
  icon,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        {description}
      </Text>
      {buttonText && onButtonPress && (
        <Button mode="contained" onPress={onButtonPress} style={styles.button}>
          {buttonText}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: darkTheme.colors.background,
  },
  icon: {
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: darkTheme.colors.onSurface,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: darkTheme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  button: {
    marginTop: spacing.md,
  },
});