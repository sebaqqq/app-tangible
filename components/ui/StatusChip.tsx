import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { darkTheme, spacing } from '@/theme/theme';

interface StatusChipProps {
  status: 'Activo' | 'Pendiente' | 'Finalizado' | 'Cancelado' | 'Pagado' | 'Rechazado' | 'Reportado' | 'En revisión' | 'Resuelto' | 'Cerrado';
}

export function StatusChip({ status }: StatusChipProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'Activo':
      case 'Pagado':
      case 'Resuelto':
        return {
          background: darkTheme.colors.secondary + '20',
          text: darkTheme.colors.secondary,
        };
      case 'Pendiente':
      case 'Reportado':
      case 'En revisión':
        return {
          background: darkTheme.colors.tertiary + '20',
          text: darkTheme.colors.tertiary,
        };
      case 'Finalizado':
      case 'Cerrado':
        return {
          background: darkTheme.colors.outline + '20',
          text: darkTheme.colors.outline,
        };
      case 'Cancelado':
      case 'Rechazado':
        return {
          background: darkTheme.colors.error + '20',
          text: darkTheme.colors.error,
        };
      default:
        return {
          background: darkTheme.colors.outline + '20',
          text: darkTheme.colors.outline,
        };
    }
  };

  const colors = getStatusColor();

  return (
    <View style={[styles.chip, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});