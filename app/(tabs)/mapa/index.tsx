import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { Text, Card, Button, FAB, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import * as Location from 'expo-location';
import { MapPin, Plus, Filter, Navigation, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Modal from 'react-native-modal';
import { darkTheme, spacing } from '@/theme/theme';
import { mockIncidentes } from '@/data/mockData';
import { StatusChip } from '@/components/ui/StatusChip';
import { formatDateDDMMYY, distanceKm } from '@/utils/format';

const categorias = ['Todos', 'Seguridad', 'Tránsito', 'Servicios', 'Emergencia', 'Otro'];

export default function MapaScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isSheetVisible, setIsSheetVisible] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const router = useRouter();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permisos requeridos',
          'La aplicación necesita acceso a tu ubicación para mostrar incidentes cercanos.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Configurar', onPress: () => Location.requestForegroundPermissionsAsync() },
          ]
        );
        return;
      }

      setHasLocationPermission(true);
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación actual');
    }
  };

  const filteredIncidents = mockIncidentes
    .filter(incidente => 
      selectedCategory === 'Todos' || incidente.categoria === selectedCategory
    )
    .sort((a, b) => {
      if (!location) return 0;
      const distA = distanceKm(location.coords, { lat: a.lat, lng: a.lng });
      const distB = distanceKm(location.coords, { lat: b.lat, lng: b.lng });
      return distA - distB;
    });

  const renderIncident = ({ item, index }: { item: typeof mockIncidentes[0], index: number }) => {
    const distance = location ? 
      distanceKm(location.coords, { lat: item.lat, lng: item.lng }).toFixed(1) : 
      null;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: index * 100 }}
      >
        <TouchableOpacity style={styles.incidentItem}>
          <Card style={styles.incidentCard}>
            <Card.Content style={styles.incidentContent}>
              <View style={styles.incidentHeader}>
                <Text variant="titleMedium" style={styles.incidentCategory}>
                  {item.categoria}
                </Text>
                <StatusChip status={item.estado} />
              </View>
              
              <Text variant="bodyMedium" style={styles.incidentDescription}>
                {item.descripcion}
              </Text>
              
              <View style={styles.incidentFooter}>
                <Text variant="bodySmall" style={styles.incidentDate}>
                  {formatDateDDMMYY(item.fecha)}
                </Text>
                {distance && (
                  <Text variant="bodySmall" style={styles.incidentDistance}>
                    {distance} km
                  </Text>
                )}
                {item.anonimo && (
                  <Text variant="bodySmall" style={styles.anonymousLabel}>
                    Anónimo
                  </Text>
                )}
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Mock Map Area */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
        style={styles.mapContainer}
      >
        <View style={styles.mockMap}>
          <MapPin size={32} color={darkTheme.colors.primary} strokeWidth={2} />
          <Text variant="bodyLarge" style={styles.mapText}>
            Mapa Interactivo
          </Text>
          <Text variant="bodySmall" style={styles.mapSubtext}>
            {hasLocationPermission ? 
              'Ubicación: Santiago, Chile' : 
              'Permisos de ubicación requeridos'
            }
          </Text>
        </View>
        
        <Button
          mode="contained"
          onPress={() => setIsSheetVisible(true)}
          style={styles.sheetToggle}
          icon={({ size, color }) => <Filter size={size} color={color} />}
        >
          Ver incidentes
        </Button>
      </MotiView>

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={isSheetVisible}
        onBackdropPress={() => setIsSheetVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setIsSheetVisible(false)}
        style={styles.modal}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.sheetHandle} />
          
          <Text variant="titleLarge" style={styles.sheetTitle}>
            Incidentes Cercanos
          </Text>

          <FlatList
            data={categorias}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
            contentContainerStyle={styles.categoriesContainer}
            renderItem={({ item }) => (
              <Chip
                selected={selectedCategory === item}
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryChip,
                  selectedCategory === item && styles.selectedChip,
                ]}
                textStyle={[
                  styles.chipText,
                  selectedCategory === item && styles.selectedChipText,
                ]}
              >
                {item}
              </Chip>
            )}
            keyExtractor={(item) => item}
          />

          <FlatList
            data={filteredIncidents}
            renderItem={renderIncident}
            style={styles.incidentsList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Modal>

      <FAB
        icon={({ size, color }) => <Plus size={size} color={color} />}
        style={styles.fab}
        onPress={() => router.push('/(tabs)/mapa/reportar')}
        label="Reportar"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mockMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.colors.surface,
    margin: spacing.md,
    borderRadius: 16,
    padding: spacing.xl,
  },
  mapText: {
    color: darkTheme.colors.onSurface,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  mapSubtext: {
    color: darkTheme.colors.onSurfaceVariant,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  sheetToggle: {
    position: 'absolute',
    bottom: spacing.xl,
    borderRadius: 28,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheetContainer: {
    backgroundColor: darkTheme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
    padding: spacing.lg,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: darkTheme.colors.outline,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  sheetTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  categoriesList: {
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  categoryChip: {
    backgroundColor: darkTheme.colors.background,
    borderColor: darkTheme.colors.outline,
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: darkTheme.colors.primaryContainer,
    borderColor: darkTheme.colors.primary,
  },
  chipText: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  selectedChipText: {
    color: darkTheme.colors.primary,
  },
  incidentsList: {
    flex: 1,
  },
  incidentItem: {
    marginBottom: spacing.sm,
  },
  incidentCard: {
    backgroundColor: darkTheme.colors.background,
  },
  incidentContent: {
    padding: spacing.md,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  incidentCategory: {
    color: darkTheme.colors.onSurface,
  },
  incidentDescription: {
    color: darkTheme.colors.onSurfaceVariant,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  incidentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  incidentDate: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  incidentDistance: {
    color: darkTheme.colors.secondary,
    fontWeight: '600',
  },
  anonymousLabel: {
    color: darkTheme.colors.tertiary,
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: darkTheme.colors.secondary,
  },
});