import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';
import { ArrowLeft, Check } from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { mockServicios } from '@/data/mockData';
import { formatCLP } from '@/utils/format';

export default function SolicitarServicioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const servicio = mockServicios.find(s => s.id === id);

  if (!servicio) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Servicio no encontrado</Text>
      </SafeAreaView>
    );
  }

  const getFormFields = () => {
    switch (servicio.categoria) {
      case 'Automotriz':
        return [
          { key: 'vehiculo', label: 'Marca y modelo del vehículo', placeholder: 'Ej: Toyota Corolla 2020' },
          { key: 'patente', label: 'Patente', placeholder: 'Ej: ABCD12' },
          { key: 'direccion', label: 'Dirección de instalación', placeholder: 'Dirección completa' },
        ];
      case 'Personal':
        return [
          { key: 'horario', label: 'Horario requerido', placeholder: 'Ej: Lunes a Viernes 8:00-17:00' },
          { key: 'ubicacion', label: 'Ubicación principal', placeholder: 'Dirección o área' },
          { key: 'detalles', label: 'Detalles adicionales', placeholder: 'Información relevante' },
        ];
      case 'Inmobiliaria':
        return [
          { key: 'direccion', label: 'Dirección de la propiedad', placeholder: 'Dirección completa' },
          { key: 'tipo', label: 'Tipo de propiedad', placeholder: 'Casa, departamento, oficina, etc.' },
          { key: 'cobertura', label: 'Áreas a cubrir', placeholder: 'Descripción de las áreas' },
        ];
      default:
        return [
          { key: 'detalles', label: 'Detalles del servicio', placeholder: 'Describe tus necesidades' },
          { key: 'ubicacion', label: 'Ubicación', placeholder: 'Dirección o área' },
        ];
    }
  };

  const handleSubmit = async () => {
    const requiredFields = getFormFields();
    const missingFields = requiredFields.filter(field => !formData[field.key]?.trim());
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    setIsLoading(true);
    
    // Simular envío
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Solicitud Enviada',
        'Tu solicitud ha sido enviada exitosamente. Nos contactaremos contigo pronto.',
        [
          { 
            text: 'OK', 
            onPress: () => router.push('/(tabs)/') 
          }
        ]
      );
    }, 2000);
  };

  const formFields = getFormFields();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <Button
            mode="text"
            onPress={() => router.back()}
            icon={({ size, color }) => <ArrowLeft size={size} color={color} />}
            style={styles.backButton}
          >
            Volver
          </Button>
          
          <Text variant="headlineMedium" style={styles.title}>
            Solicitar Servicio
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 700, delay: 200 }}
        >
          <Card style={styles.serviceCard}>
            <Card.Content style={styles.serviceContent}>
              <Text variant="titleLarge" style={styles.serviceName}>
                {servicio.nombre}
              </Text>
              <Text variant="bodyMedium" style={styles.serviceDescription}>
                {servicio.descripcion}
              </Text>
              {servicio.precio && (
                <Text variant="titleMedium" style={styles.servicePrice}>
                  {formatCLP(servicio.precio)}/mes
                </Text>
              )}
            </Card.Content>
          </Card>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 400 }}
        >
          <Card style={styles.formCard}>
            <Card.Content style={styles.formContent}>
              <Text variant="titleMedium" style={styles.formTitle}>
                Información Requerida
              </Text>
              
              {formFields.map((field, index) => (
                <MotiView
                  key={field.key}
                  from={{ opacity: 0, translateX: 30 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ type: 'timing', duration: 500, delay: 600 + index * 100 }}
                >
                  <TextInput
                    label={field.label}
                    value={formData[field.key] || ''}
                    onChangeText={(value) => setFormData(prev => ({ ...prev, [field.key]: value }))}
                    mode="outlined"
                    placeholder={field.placeholder}
                    style={styles.input}
                    theme={{ colors: darkTheme.colors }}
                    multiline={field.key === 'detalles' || field.key === 'cobertura'}
                    numberOfLines={field.key === 'detalles' || field.key === 'cobertura' ? 3 : 1}
                  />
                </MotiView>
              ))}
            </Card.Content>
          </Card>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 800 }}
        >
          <Card style={styles.summaryCard}>
            <Card.Content style={styles.summaryContent}>
              <Text variant="titleMedium" style={styles.summaryTitle}>
                Resumen
              </Text>
              <Divider style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Servicio:</Text>
                <Text style={styles.summaryValue}>{servicio.nombre}</Text>
              </View>
              
              {servicio.precio && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Precio mensual:</Text>
                  <Text style={[styles.summaryValue, styles.priceValue]}>
                    {formatCLP(servicio.precio)}
                  </Text>
                </View>
              )}
              
              <View style={styles.benefitsSection}>
                <Text style={styles.summaryLabel}>Incluye:</Text>
                {servicio.beneficios.slice(0, 3).map((beneficio, index) => (
                  <View key={index} style={styles.benefitRow}>
                    <Check size={16} color={darkTheme.colors.secondary} strokeWidth={2} />
                    <Text style={styles.benefitText}>{beneficio}</Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        </MotiView>
      </ScrollView>

      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 1000 }}
        style={styles.footer}
      >
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.submitButton}
          contentStyle={styles.buttonContent}
        >
          Confirmar Solicitud
        </Button>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    paddingBottom: spacing.md,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    color: darkTheme.colors.onSurface,
  },
  serviceCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  serviceContent: {
    padding: spacing.lg,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: darkTheme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  heroInfo: {
    flex: 1,
  },
  serviceName: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  serviceCategory: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  serviceDescription: {
    color: darkTheme.colors.onSurfaceVariant,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  servicePrice: {
    color: darkTheme.colors.primary,
    fontWeight: '700',
  },
  formCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  formContent: {
    padding: spacing.lg,
  },
  formTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  summaryCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: darkTheme.colors.surface,
  },
  summaryContent: {
    padding: spacing.lg,
  },
  summaryTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.sm,
  },
  divider: {
    backgroundColor: darkTheme.colors.outline,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  summaryValue: {
    color: darkTheme.colors.onSurface,
    fontWeight: '600',
  },
  priceValue: {
    color: darkTheme.colors.primary,
  },
  benefitsSection: {
    marginTop: spacing.md,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  benefitText: {
    color: darkTheme.colors.onSurface,
    flex: 1,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: darkTheme.colors.surface,
    borderTopWidth: 0.5,
    borderTopColor: darkTheme.colors.outline,
  },
  submitButton: {
    borderRadius: 28,
  },
  buttonContent: {
    height: 56,
  },
});