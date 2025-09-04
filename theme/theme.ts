import { MD3DarkTheme } from 'react-native-paper';

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4F46E5', // Indigo
    primaryContainer: '#3730A3',
    secondary: '#10B981', // Emerald
    secondaryContainer: '#065F46',
    tertiary: '#F59E0B', // Amber
    tertiaryContainer: '#92400E',
    surface: '#1F2937', // Gray-800
    surfaceVariant: '#374151', // Gray-700
    background: '#111827', // Gray-900
    outline: '#6B7280', // Gray-500
    onSurface: '#F9FAFB', // Gray-50
    onSurfaceVariant: '#D1D5DB', // Gray-300
    error: '#EF4444', // Red-500
    errorContainer: '#7F1D1D',
    success: '#10B981', // Green-500
    warning: '#F59E0B', // Yellow-500
  },
  roundness: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  headlineSmall: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  titleMedium: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  labelLarge: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
};