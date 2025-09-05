import { MD3DarkTheme } from 'react-native-paper';

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Acentos (Teal)
    primary: '#48eadf',
    primarySelected: '#000000',
    primaryContainer: '#2bb8b0',
    secondary: '#2bb8b0',
    secondaryContainer: '#0f0f0f',
    // Mantener tertiary para compatibilidad; usa la variante brillante
    tertiary: '#48eadf',
    tertiaryContainer: '#1a1a1a',

    // Superficies y fondos (Negros)
    background: '#0a0a0a', // Negro Principal
    surface: '#141414', // Superficie
    surfaceVariant: '#1e1e1e', // Superficie Elevada
    surfaceNavigation: '#0f0f0f',

    // Texto
    onSurface: '#ffffff', // Blanco Principal
    onSurfaceVariant: '#cccccc', // Gris Claro
    outline: '#999999', // Gris Medio

    // Estados
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    errorContainer: '#7F1D1D',
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

export const radii = {
  sm: 8, // 0.5rem
  lg: 12, // 0.75rem
  xl: 16, // 1rem
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  glow: '0 0 20px rgba(72, 234, 223, 0.15)',
};

export const fonts = {
  primary: 'Inter',
  complementary: 'Inter',
  alternative: 'Avenir',
  weights: { w300: '300', w400: '400', w500: '500', w600: '600', w700: '700' },
};
