import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Shield, Eye, EyeOff } from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Credenciales inválidas. Intenta con:\nemail: sebastian@example.com\ncontraseña: password');
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Login Social', `Login con ${provider} - Funcionalidad mock`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MotiView
          from={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.header}
        >
          <Shield size={60} color={darkTheme.colors.primary} strokeWidth={1.5} />
          <Text variant="headlineMedium" style={styles.title}>
            Bienvenido de vuelta
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Inicia sesión en tu cuenta de seguridad
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          style={styles.form}
        >
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            theme={{ colors: darkTheme.colors }}
          />

          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!isPasswordVisible}
            right={
              <TextInput.Icon
                icon={({ size, color }) => 
                  isPasswordVisible ? 
                    <EyeOff size={size} color={color} /> : 
                    <Eye size={size} color={color} />
                }
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
            style={styles.input}
            theme={{ colors: darkTheme.colors }}
          />

          <Button
            mode="text"
            onPress={() => Alert.alert('Recuperar Contraseña', 'Funcionalidad mock')}
            style={styles.forgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </Button>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
          >
            Iniciar Sesión
          </Button>

          <Divider style={styles.divider} />

          <View style={styles.socialButtons}>
            <Button
              mode="outlined"
              onPress={() => handleSocialLogin('Google')}
              style={styles.socialButton}
              icon="google"
            >
              Google
            </Button>
            <Button
              mode="outlined"
              onPress={() => handleSocialLogin('Apple')}
              style={styles.socialButton}
              icon="apple"
            >
              Apple
            </Button>
          </View>

          <View style={styles.registerSection}>
            <Text style={styles.registerText}>
              ¿No tienes cuenta?{' '}
            </Text>
            <Button
              mode="text"
              onPress={() => router.push('/(auth)/register')}
              compact
            >
              Regístrate aquí
            </Button>
          </View>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    marginTop: spacing.lg,
  },
  title: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    textAlign: 'center',
    color: darkTheme.colors.onSurface,
  },
  subtitle: {
    textAlign: 'center',
    color: darkTheme.colors.onSurfaceVariant,
  },
  form: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: darkTheme.colors.surface,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
  },
  loginButton: {
    marginTop: spacing.md,
    borderRadius: 28,
  },
  buttonContent: {
    height: 56,
  },
  divider: {
    marginVertical: spacing.lg,
    backgroundColor: darkTheme.colors.outline,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
    borderColor: darkTheme.colors.outline,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  registerText: {
    color: darkTheme.colors.onSurfaceVariant,
  },
});