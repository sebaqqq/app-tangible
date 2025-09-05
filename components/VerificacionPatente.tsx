import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { MotiView } from 'moti';
import {
  Search,
  Car,
  User,
  Calendar,
  Shield,
  AlertTriangle,
} from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { Vehiculo } from '@/types';
import { buscarVehiculoPorPatente } from '@/data/mockData';
import { formatDateDDMMYY } from '@/utils/format';

interface VerificacionPatenteProps {
  onVerificar: (vehiculo: Vehiculo | null) => void;
}

export default function VerificacionPatente({
  onVerificar,
}: VerificacionPatenteProps) {
  const [patente, setPatente] = useState('');
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = async () => {
    if (!patente.trim()) {
      Alert.alert('Error', 'Por favor ingresa una patente');
      return;
    }

    setBuscando(true);

    // Simular delay de búsqueda
    setTimeout(() => {
      const resultado = buscarVehiculoPorPatente(patente);
      setVehiculo(resultado);
      onVerificar(resultado);
      setBuscando(false);

      if (!resultado) {
        Alert.alert(
          'No encontrado',
          'No se encontró información para esta patente'
        );
      }
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
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 600 }}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Text variant="titleLarge" style={styles.title}>
            Verificar Vehículo
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Ingresa la patente para consultar información del vehículo
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
              icon={({ size, color }) => <Search size={size} color={color} />}
            >
              Buscar
            </Button>
          </View>

          {vehiculo && (
            <MotiView
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 500 }}
              style={styles.resultContainer}
            >
              <Divider style={styles.divider} />

              <View style={styles.vehiculoInfo}>
                <View style={styles.vehiculoHeader}>
                  <Car size={24} color={darkTheme.colors.primary} />
                  <View style={styles.vehiculoTitle}>
                    <Text variant="titleMedium" style={styles.vehiculoName}>
                      {vehiculo.marca} {vehiculo.modelo}
                    </Text>
                    <Text variant="bodySmall" style={styles.vehiculoYear}>
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

              <View style={styles.detailsContainer}>
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
                  <User size={16} color={darkTheme.colors.onSurfaceVariant} />
                  <Text variant="titleSmall" style={styles.propietarioTitle}>
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
                  <Text variant="titleSmall" style={styles.serviciosTitle}>
                    Servicios Activos
                  </Text>
                  {vehiculo.serviciosActivos.map((servicio, index) => (
                    <View key={index} style={styles.servicioItem}>
                      <Shield size={14} color={darkTheme.colors.primary} />
                      <Text style={styles.servicioText}>{servicio}</Text>
                    </View>
                  ))}
                </View>
              )}

              <Button
                mode="outlined"
                onPress={() => {
                  setVehiculo(null);
                  setPatente('');
                  onVerificar(null);
                }}
                style={styles.clearButton}
              >
                Nueva búsqueda
              </Button>
            </MotiView>
          )}
        </Card.Content>
      </Card>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  card: {
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
  content: {
    padding: spacing.lg,
  },
  title: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: darkTheme.colors.onSurfaceVariant,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
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
    marginTop: spacing.md,
  },
  divider: {
    marginVertical: spacing.md,
    backgroundColor: darkTheme.colors.outline,
  },
  vehiculoInfo: {
    marginBottom: spacing.md,
  },
  vehiculoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  vehiculoTitle: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  vehiculoName: {
    color: darkTheme.colors.onSurface,
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
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    gap: spacing.xs,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    color: darkTheme.colors.onSurfaceVariant,
    fontSize: 14,
  },
  detailValue: {
    color: darkTheme.colors.onSurface,
    fontSize: 14,
    fontWeight: '500',
  },
  propietarioContainer: {
    backgroundColor: darkTheme.colors.surfaceVariant,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  propietarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  propietarioTitle: {
    color: darkTheme.colors.onSurfaceVariant,
    marginLeft: spacing.xs,
  },
  propietarioName: {
    color: darkTheme.colors.onSurface,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  propietarioRut: {
    color: darkTheme.colors.onSurfaceVariant,
    fontSize: 14,
  },
  serviciosContainer: {
    marginBottom: spacing.md,
  },
  serviciosTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.sm,
  },
  servicioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  servicioText: {
    color: darkTheme.colors.onSurface,
    fontSize: 14,
  },
  clearButton: {
    borderColor: darkTheme.colors.outline,
  },
});
