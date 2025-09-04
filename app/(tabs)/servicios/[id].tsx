import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';
import { ArrowLeft, Check, Car, User, Chrome as Home, Users, Building } from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { mockServicios } from '@/data/mockData';
import { formatCLP } from '@/utils/format';

const iconMap = {
  car: Car,
  'shield-check': User,
  home: Home,
  users: Users,
  building: Building,
};

export default function ServicioDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const servicio = mockServicios.find(s => s.id === id);

  if (!servicio) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Servicio no encontrado</Text>
      </SafeAreaView>
    );
  }

  const IconComponent = iconMap[servicio.icono as keyof typeof iconMap] || User;

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
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 700, delay: 200 }}
        >
          <Card style={styles.heroCard}>
            <Card.Content style={styles.heroContent}>
              <View style={styles.heroHeader}>
                <View style={styles.iconContainer}>
                  <IconComponent size={40} color={darkTheme.colors.primary} strokeWidth={1.5} />
                </View>
                <View style={styles.heroInfo}>
                  <Text variant="headlineSmall" style={styles.serviceName}>
                    {servicio.nombre}
                  </Text>
                  <Text variant="bodyMedium" style={styles.serviceCategory}>
                    {servicio.categoria}
                  </Text>
                </View>
              </View>
              
              {servicio.precio && (
                <Text variant="titleLarge" style={styles.servicePrice}>
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
          <Card style={styles.descriptionCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Descripción
              </Text>
              <Text variant="bodyMedium" style={styles.description}>
                {servicio.descripcion}
              </Text>
            </Card.Content>
          </Card>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 600 }}
        >
          <Card style={styles.benefitsCard}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Beneficios Incluidos
              </Text>
              {servicio.beneficios.map((beneficio, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, translateX: 20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ type: 'timing', duration: 500, delay: 700 + index * 100 }}
                  style={styles.benefitItem}
                >
                  <Check size={20} color={darkTheme.colors.secondary} strokeWidth={2} />
                  <Text variant="bodyMedium" style={styles.benefitText}>
                    {beneficio}
                  </Text>
                </MotiView>
              ))}
            </Card.Content>
          </Card>
        </MotiView>
      </ScrollView>

      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 800 }}
        style={styles.footer}
      >
        <Button
          mode="contained"
          onPress={() => router.push(`/(tabs)/servicios/solicitar/${id}`)}
          style={styles.requestButton}
          contentStyle={styles.buttonContent}
        >
          Solicitar Servicio
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
  },
  heroCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  heroContent: {
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
  servicePrice: {
    color: darkTheme.colors.primary,
    fontWeight: '700',
  },
  descriptionCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  benefitsCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: darkTheme.colors.surface,
  },
  cardContent: {
    padding: spacing.lg,
  },
  sectionTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  description: {
    color: darkTheme.colors.onSurfaceVariant,
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
  requestButton: {
    borderRadius: 28,
  },
  buttonContent: {
    height: 56,
  },
});