import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { UserPlus, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { nombre, rut, email, telefono, password, confirmPassword } = formData;
    
    if (!nombre || !rut || !email || !telefono || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const { confirmPassword, password, ...userData } = formData;
    const success = await register(userData, password);
    setIsLoading(false);

    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'No se pudo crear la cuenta. Intenta nuevamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MotiView
          from={{ opacity: 0, translateX: -30 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <Button
            mode="text"
            onPress={() => router.back()}
            icon={({ size, color }) => <ArrowLeft size={size} color={color} />}
            style={styles.backButton}
          >
            Volver
          </Button>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.header}
        >
          <UserPlus size={60} color={darkTheme.colors.primary} strokeWidth={1.5} />
          <Text variant="headlineMedium" style={styles.title}>
            Crear cuenta
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Únete a nuestra comunidad segura
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          style={styles.form}
        >
          <TextInput
            label="Nombre completo"
            value={formData.nombre}
            onChangeText={(value) => updateField('nombre', value)}
            mode="outlined"
            style={styles.input}
            theme={{ colors: darkTheme.colors }}
          />

          <TextInput
            label="RUT"
            value={formData.rut}
            onChangeText={(value) => updateField('rut', value)}
            mode="outlined"
            placeholder="12.345.678-9"
            style={styles.input}
            theme={{ colors: darkTheme.colors }}
          />

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            theme={{ colors: darkTheme.colors }}
          />

          <TextInput
            label="Teléfono"
            value={formData.telefono}
            onChangeText={(value) => updateField('telefono', value)}
            mode="outlined"
            keyboardType="phone-pad"
            placeholder="+56912345678"
            style={styles.input}
            theme={{ colors: darkTheme.colors }}
          />

          <TextInput
            label="Contraseña"
            value={formData.password}
            onChangeText={(value) => updateField('password', value)}
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

          <TextInput
            label="Confirmar contraseña"
            value={formData.confirmPassword}
            onChangeText={(value) => updateField('confirmPassword', value)}
            mode="outlined"
            secureTextEntry={!isConfirmPasswordVisible}
            right={
              <TextInput.Icon
                icon={({ size, color }) => 
                  isConfirmPasswordVisible ? 
                    <EyeOff size={size} color={color} /> : 
                    <Eye size={size} color={color} />
                }
                onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              />
            }
            style={styles.input}
            theme={{ colors: darkTheme.colors }}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
          >
            Crear Cuenta
          </Button>

          <View style={styles.loginSection}>
            <Text style={styles.loginText}>
              ¿Ya tienes cuenta?{' '}
            </Text>
            <Button
              mode="text"
              onPress={() => router.replace('/(auth)/login')}
              compact
            >
              Inicia sesión
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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  registerButton: {
    marginTop: spacing.lg,
    borderRadius: 28,
  },
  buttonContent: {
    height: 56,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  loginText: {
    color: darkTheme.colors.onSurfaceVariant,
  },
});