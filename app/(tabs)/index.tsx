import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import {
  Plus,
  TriangleAlert as AlertTriangle,
  ArrowRight,
} from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { useAuth } from '@/hooks/useAuth';
import { StatusChip } from '@/components/ui/StatusChip';
import {
  getGreetingMessage,
  mockServicios,
  mockSolicitudes,
} from '@/data/mockData';
import { formatDateDDMMYY } from '@/utils/format';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const cardWidth = width - spacing.xl * 2;

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const greeting = user
    ? getGreetingMessage(user.nombre.split(' ')[0])
    : 'Hola 👋';
  const featuredServices = mockServicios.slice(0, 3);

  const renderServiceSlide = ({
    item,
  }: {
    item: (typeof mockServicios)[0];
  }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 600 }}
    >
      <Card style={styles.serviceCard}>
        <Card.Content style={styles.serviceContent}>
          <Text variant="titleLarge" style={styles.serviceName}>
            {item.nombre}
          </Text>
          <Text variant="bodyMedium" style={styles.serviceDescription}>
            {item.descripcion}
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => router.push('/(tabs)/servicios')}
            style={styles.serviceButton}
          >
            Ver más
          </Button>
        </Card.Content>
      </Card>
    </MotiView>
  );

  const renderActiveService = ({
    item,
  }: {
    item: (typeof mockSolicitudes)[0];
  }) => {
    const servicio = mockServicios.find((s) => s.id === item.servicioId);
    if (!servicio) return null;

    return (
      <MotiView
        from={{ opacity: 0, translateX: 30 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/servicios')}
          style={styles.activeServiceItem}
        >
          <Card style={styles.activeServiceCard}>
            <Card.Content style={styles.activeServiceContent}>
              <View style={styles.serviceHeader}>
                <Text variant="titleMedium" style={styles.activeServiceName}>
                  {servicio.nombre}
                </Text>
                <StatusChip status={item.estado} />
              </View>
              <Text variant="bodySmall" style={styles.activeServiceDate}>
                Creado: {formatDateDDMMYY(item.fechaCreacion)}
              </Text>
              <ArrowRight
                size={16}
                color={darkTheme.colors.primary}
                style={styles.arrow}
              />
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con saludo */}
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.header}
        >
          <Text variant="headlineMedium" style={styles.greeting}>
            {greeting}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Tu seguridad es nuestra prioridad
          </Text>
        </MotiView>

        {/* Servicios destacados */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          style={styles.section}
        >
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Servicios Destacados
          </Text>
          <FlatList
            data={featuredServices}
            renderItem={renderServiceSlide}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth}
            decelerationRate="fast"
            contentContainerStyle={styles.servicesContainer}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / cardWidth
              );
              setCurrentSlide(index);
            }}
          />
        </MotiView>

        {/* Servicios activos */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 400 }}
          style={styles.section}
        >
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Tus Servicios Activos
          </Text>
          {mockSolicitudes.length > 0 ? (
            <FlatList
              data={mockSolicitudes}
              renderItem={renderActiveService}
              scrollEnabled={false}
              style={styles.activeServicesList}
            />
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Text style={styles.emptyText}>
                  No tienes servicios activos
                </Text>
                <Button
                  mode="contained"
                  onPress={() => router.push('/(tabs)/servicios')}
                  style={styles.emptyButton}
                >
                  Explorar Servicios
                </Button>
              </Card.Content>
            </Card>
          )}
        </MotiView>

        {/* Botones rápidos */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
          style={styles.quickActions}
        >
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Acciones Rápidas
          </Text>
          <View style={styles.quickButtonsRow}>
            <Button
              mode="contained"
              onPress={() => router.push('/(tabs)/servicios')}
              style={[styles.quickButton, styles.primaryButton]}
              contentStyle={styles.quickButtonContent}
              icon={({ size, color }) => <Plus size={size} color={color} />}
            >
              Solicitar Servicio
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => router.push('/(tabs)/mapa')}
              style={[styles.quickButton, styles.secondaryButton]}
              contentStyle={styles.quickButtonContent}
              icon={({ size, color }) => (
                <AlertTriangle size={size} color={color} />
              )}
            >
              Reportar Incidente
            </Button>
          </View>
        </MotiView>
      </ScrollView>

      <FAB
        icon={({ size, color }) => <Plus size={size} color={color} />}
        style={styles.fab}
        onPress={() => router.push('/(tabs)/servicios')}
        label="Nuevo servicio"
      />
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Espacio para el FAB
  },
  header: {
    padding: isSmallScreen ? spacing.lg : spacing.xl,
    paddingBottom: spacing.lg,
  },
  greeting: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
    paddingHorizontal: isSmallScreen ? spacing.lg : spacing.xl,
  },
  servicesContainer: {
    paddingLeft: isSmallScreen ? spacing.lg : spacing.xl,
    paddingRight: isSmallScreen ? spacing.lg : spacing.xl,
    gap: spacing.md,
  },
  serviceCard: {
    width: cardWidth,
    backgroundColor: darkTheme.colors.surface,
    marginRight: spacing.md,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceContent: {
    padding: isSmallScreen ? spacing.md : spacing.lg,
  },
  serviceName: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.sm,
  },
  serviceDescription: {
    color: darkTheme.colors.onSurfaceVariant,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  serviceButton: {
    alignSelf: 'flex-start',
  },
  activeServicesList: {
    paddingHorizontal: isSmallScreen ? spacing.lg : spacing.xl,
  },
  activeServiceItem: {
    marginBottom: spacing.sm,
  },
  activeServiceCard: {
    backgroundColor: darkTheme.colors.surface,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activeServiceContent: {
    padding: spacing.md,
    position: 'relative',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  activeServiceName: {
    color: darkTheme.colors.onSurface,
    flex: 1,
    marginRight: spacing.sm,
  },
  activeServiceDate: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  arrow: {
    position: 'absolute',
    right: spacing.md,
    top: '50%',
    marginTop: -8,
  },
  emptyCard: {
    marginHorizontal: isSmallScreen ? spacing.lg : spacing.xl,
    backgroundColor: darkTheme.colors.surface,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  emptyContent: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    color: darkTheme.colors.onSurfaceVariant,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: spacing.sm,
  },
  quickActions: {
    paddingHorizontal: isSmallScreen ? spacing.lg : spacing.xl,
    marginBottom: spacing.xxl,
  },
  quickButtonsRow: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    gap: spacing.md,
  },
  quickButton: {
    flex: 1,
    borderRadius: 16,
    minHeight: 56,
  },
  quickButtonContent: {
    height: 56,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: darkTheme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: darkTheme.colors.secondaryContainer,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: darkTheme.colors.primary,
  },
});
