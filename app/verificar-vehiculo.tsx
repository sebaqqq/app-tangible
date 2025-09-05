import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import {
  Search,
  Car,
  User,
  Calendar,
  Shield,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { Vehiculo } from '@/types';
import { buscarVehiculoPorPatente } from '@/data/mockData';
import { formatDateDDMMYY } from '@/utils/format';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

export default function VerificarVehiculoScreen() {
  const router = useRouter();
  const [patente, setPatente] = useState('');
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = async () => {
    if (!patente.trim()) {
      return;
    }

    setBuscando(true);

    // Simular delay de búsqueda
    setTimeout(() => {
      const resultado = buscarVehiculoPorPatente(patente);
      setVehiculo(resultado);
      setBuscando(false);
    }, 1000);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Vigente':
        return darkTheme.colors.primary;
      case 'Robado':
        return '#f44336';
      case 'Secuestrado':
        return '#ff9800';
      case 'En proceso':
        return '#2196f3';
      default:
        return darkTheme.colors.onSurfaceVariant;
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Vigente':
        return <Shield size={16} color={getEstadoColor(estado)} />;
      case 'Robado':
      case 'Secuestrado':
        return <AlertTriangle size={16} color={getEstadoColor(estado)} />;
      case 'En proceso':
        return <Calendar size={16} color={getEstadoColor(estado)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
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
            Verificar Vehículo
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Consulta información detallada de cualquier vehículo por su patente
          </Text>
        </MotiView>

        {/* Formulario de búsqueda */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
          style={styles.searchContainer}
        >
          <Card style={styles.searchCard}>
            <Card.Content style={styles.searchContent}>
              <Text variant="titleLarge" style={styles.searchTitle}>
                Buscar por Patente
              </Text>
              <Text variant="bodyMedium" style={styles.searchDescription}>
                Ingresa la patente del vehículo que deseas verificar
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={patente}
                  onChangeText={setPatente}
                  placeholder="Ej: ABCD12"
                  placeholderTextColor={darkTheme.colors.onSurfaceVariant}
                  autoCapitalize="characters"
                  maxLength={8}
                />
                <Button
                  mode="contained"
                  onPress={handleBuscar}
                  loading={buscando}
                  disabled={buscando || !patente.trim()}
                  style={styles.searchButton}
                  icon={({ size, color }) => (
                    <Search size={size} color={color} />
                  )}
                >
                  Buscar
                </Button>
              </View>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Resultados */}
        {vehiculo && (
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.resultContainer}
          >
            <Card style={styles.resultCard}>
              <Card.Content style={styles.resultContent}>
                <Text variant="titleLarge" style={styles.resultTitle}>
                  Información del Vehículo
                </Text>

                <View style={styles.vehiculoInfo}>
                  <View style={styles.vehiculoHeader}>
                    <Car size={32} color={darkTheme.colors.primary} />
                    <View style={styles.vehiculoTitle}>
                      <Text variant="headlineSmall" style={styles.vehiculoName}>
                        {vehiculo.marca} {vehiculo.modelo}
                      </Text>
                      <Text variant="bodyLarge" style={styles.vehiculoYear}>
                        {vehiculo.año} • {vehiculo.color}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.estadoContainer}>
                    <View style={styles.estadoBadge}>
                      {getEstadoIcon(vehiculo.estado)}
                      <Text
                        style={[
                          styles.estadoText,
                          { color: getEstadoColor(vehiculo.estado) },
                        ]}
                      >
                        {vehiculo.estado}
                      </Text>
                    </View>
                  </View>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.detailsContainer}>
                  <Text variant="titleMedium" style={styles.detailsTitle}>
                    Detalles del Vehículo
                  </Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Patente:</Text>
                    <Text style={styles.detailValue}>{vehiculo.patente}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Tipo:</Text>
                    <Text style={styles.detailValue}>{vehiculo.tipo}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Última verificación:</Text>
                    <Text style={styles.detailValue}>
                      {formatDateDDMMYY(vehiculo.ultimaVerificacion)}
                    </Text>
                  </View>
                </View>

                <View style={styles.propietarioContainer}>
                  <View style={styles.propietarioHeader}>
                    <User size={20} color={darkTheme.colors.onSurfaceVariant} />
                    <Text variant="titleMedium" style={styles.propietarioTitle}>
                      Propietario
                    </Text>
                  </View>
                  <Text style={styles.propietarioName}>
                    {vehiculo.propietario.nombre}
                  </Text>
                  <Text style={styles.propietarioRut}>
                    RUT: {vehiculo.propietario.rut}
                  </Text>
                </View>

                {vehiculo.serviciosActivos.length > 0 && (
                  <View style={styles.serviciosContainer}>
                    <Text variant="titleMedium" style={styles.serviciosTitle}>
                      Servicios Activos
                    </Text>
                    {vehiculo.serviciosActivos.map((servicio, index) => (
                      <View key={index} style={styles.servicioItem}>
                        <Shield size={16} color={darkTheme.colors.primary} />
                        <Text style={styles.servicioText}>{servicio}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {vehiculo.historial.length > 0 && (
                  <View style={styles.historialContainer}>
                    <Text variant="titleMedium" style={styles.historialTitle}>
                      Historial Reciente
                    </Text>
                    {vehiculo.historial.slice(0, 3).map((evento, index) => (
                      <View key={index} style={styles.historialItem}>
                        <View style={styles.historialContent}>
                          <Text style={styles.historialEvento}>
                            {evento.evento}
                          </Text>
                          <Text style={styles.historialDescripcion}>
                            {evento.descripcion}
                          </Text>
                          <Text style={styles.historialFecha}>
                            {formatDateDDMMYY(evento.fecha)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                <Button
                  mode="outlined"
                  onPress={() => {
                    setVehiculo(null);
                    setPatente('');
                  }}
                  style={styles.clearButton}
                >
                  Nueva búsqueda
                </Button>
              </Card.Content>
            </Card>
          </MotiView>
        )}

        {vehiculo === null && patente && !buscando && (
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 500 }}
            style={styles.noResultContainer}
          >
            <Card style={styles.noResultCard}>
              <Card.Content style={styles.noResultContent}>
                <AlertTriangle size={48} color={darkTheme.colors.error} />
                <Text variant="titleMedium" style={styles.noResultTitle}>
                  No se encontró información
                </Text>
                <Text style={styles.noResultText}>
                  No se encontró información para la patente "{patente}".
                  Verifica que la patente esté correctamente escrita.
                </Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    setPatente('');
                  }}
                  style={styles.tryAgainButton}
                >
                  Intentar otra patente
                </Button>
              </Card.Content>
            </Card>
          </MotiView>
        )}
      </ScrollView>
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
    paddingBottom: spacing.xl,
  },
  header: {
    padding: isSmallScreen ? spacing.lg : spacing.xl,
    paddingBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  searchContainer: {
    paddingHorizontal: isSmallScreen ? spacing.lg : spacing.xl,
    marginBottom: spacing.lg,
  },
  searchCard: {
    backgroundColor: darkTheme.colors.surface,
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
  searchContent: {
    padding: spacing.lg,
  },
  searchTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  searchDescription: {
    color: darkTheme.colors.onSurfaceVariant,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: darkTheme.colors.surfaceVariant,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: darkTheme.colors.onSurface,
    fontSize: 16,
    borderWidth: 1,
    borderColor: darkTheme.colors.outline,
  },
  searchButton: {
    borderRadius: 12,
    minWidth: 100,
  },
  resultContainer: {
    paddingHorizontal: isSmallScreen ? spacing.lg : spacing.xl,
    marginBottom: spacing.lg,
  },
  resultCard: {
    backgroundColor: darkTheme.colors.surface,
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
  resultContent: {
    padding: spacing.lg,
  },
  resultTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.lg,
  },
  vehiculoInfo: {
    marginBottom: spacing.lg,
  },
  vehiculoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  vehiculoTitle: {
    marginLeft: spacing.md,
    flex: 1,
  },
  vehiculoName: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  vehiculoYear: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  estadoContainer: {
    alignItems: 'flex-start',
  },
  estadoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkTheme.colors.surfaceVariant,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    gap: spacing.sm,
  },
  estadoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    marginVertical: spacing.lg,
    backgroundColor: darkTheme.colors.outline,
  },
  detailsContainer: {
    marginBottom: spacing.lg,
  },
  detailsTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
  },
  detailLabel: {
    color: darkTheme.colors.onSurfaceVariant,
    fontSize: 16,
  },
  detailValue: {
    color: darkTheme.colors.onSurface,
    fontSize: 16,
    fontWeight: '500',
  },
  propietarioContainer: {
    backgroundColor: darkTheme.colors.surfaceVariant,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  propietarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  propietarioTitle: {
    color: darkTheme.colors.onSurfaceVariant,
    marginLeft: spacing.sm,
  },
  propietarioName: {
    color: darkTheme.colors.onSurface,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  propietarioRut: {
    color: darkTheme.colors.onSurfaceVariant,
    fontSize: 16,
  },
  serviciosContainer: {
    marginBottom: spacing.lg,
  },
  serviciosTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  servicioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  servicioText: {
    color: darkTheme.colors.onSurface,
    fontSize: 16,
  },
  historialContainer: {
    marginBottom: spacing.lg,
  },
  historialTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  historialItem: {
    backgroundColor: darkTheme.colors.surfaceVariant,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  historialContent: {
    gap: spacing.xs,
  },
  historialEvento: {
    color: darkTheme.colors.onSurface,
    fontSize: 16,
    fontWeight: '600',
  },
  historialDescripcion: {
    color: darkTheme.colors.onSurfaceVariant,
    fontSize: 14,
  },
  historialFecha: {
    color: darkTheme.colors.onSurfaceVariant,
    fontSize: 12,
    fontStyle: 'italic',
  },
  clearButton: {
    borderColor: darkTheme.colors.outline,
  },
  noResultContainer: {
    paddingHorizontal: isSmallScreen ? spacing.lg : spacing.xl,
  },
  noResultCard: {
    backgroundColor: darkTheme.colors.surface,
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
  noResultContent: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  noResultTitle: {
    color: darkTheme.colors.onSurface,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  noResultText: {
    color: darkTheme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  tryAgainButton: {
    marginTop: spacing.sm,
  },
});
