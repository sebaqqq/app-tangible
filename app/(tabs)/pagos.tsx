import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Searchbar, Chip, Button, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { CreditCard, Download, Plus } from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { mockPagos, mockServicios } from '@/data/mockData';
import { StatusChip } from '@/components/ui/StatusChip';
import { formatCLP, formatDateDDMMYY } from '@/utils/format';

const filtros = ['Todos', 'Pendientes', 'Pagados', 'Rechazados'];

export default function PagosScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filteredPayments = mockPagos.filter((pago) => {
    const servicio = mockServicios.find((s) => s.id === pago.servicioId);
    const serviceName = servicio?.nombre || 'Servicio';

    const matchesSearch = serviceName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'Todos' ||
      (selectedFilter === 'Pendientes' && pago.estado === 'Pendiente') ||
      (selectedFilter === 'Pagados' && pago.estado === 'Pagado') ||
      (selectedFilter === 'Rechazados' && pago.estado === 'Rechazado');

    return matchesSearch && matchesFilter;
  });

  const handleDownloadReceipt = (pagoId: string) => {
    Alert.alert(
      'Comprobante',
      `Descargando comprobante del pago ${pagoId}... (Mock)`,
      [{ text: 'OK' }]
    );
  };

  const handlePayNow = (pagoId: string) => {
    Alert.alert('Procesar Pago', '¿Cómo deseas pagar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Tarjeta de Crédito', onPress: () => mockPayment('tarjeta') },
      { text: 'Transferencia', onPress: () => mockPayment('transferencia') },
    ]);
  };

  const mockPayment = (method: string) => {
    Alert.alert(
      'Pago Procesado',
      `Pago con ${method} procesado exitosamente (Mock)`
    );
  };

  const getTotalPendiente = () => {
    return mockPagos
      .filter((pago) => pago.estado === 'Pendiente')
      .reduce((total, pago) => total + pago.monto, 0);
  };

  const renderPayment = ({
    item,
    index,
  }: {
    item: (typeof mockPagos)[0];
    index: number;
  }) => {
    const servicio = mockServicios.find((s) => s.id === item.servicioId);

    return (
      <MotiView
        from={{ opacity: 0, translateX: 30 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 500, delay: index * 100 }}
      >
        <Card style={styles.paymentCard}>
          <Card.Content style={styles.paymentContent}>
            <View style={styles.paymentHeader}>
              <View style={styles.paymentInfo}>
                <Text variant="titleMedium" style={styles.serviceName}>
                  {servicio?.nombre || 'Servicio'}
                </Text>
                <Text variant="bodySmall" style={styles.paymentDate}>
                  {formatDateDDMMYY(item.fecha)} • {item.metodo}
                </Text>
              </View>
              <StatusChip status={item.estado} />
            </View>

            <View style={styles.paymentAmount}>
              <Text variant="titleLarge" style={styles.amount}>
                {formatCLP(item.monto)}
              </Text>
            </View>

            <View style={styles.paymentActions}>
              {item.estado === 'Pendiente' && (
                <Button
                  mode="contained"
                  onPress={() => handlePayNow(item.id)}
                  style={styles.payButton}
                  contentStyle={styles.actionButtonContent}
                  icon={({ size, color }) => (
                    <CreditCard size={size} color={color} />
                  )}
                >
                  Pagar Ahora
                </Button>
              )}

              {item.estado === 'Pagado' && item.comprobante && (
                <Button
                  mode="outlined"
                  onPress={() => handleDownloadReceipt(item.id)}
                  style={styles.downloadButton}
                  contentStyle={styles.actionButtonContent}
                  icon={({ size, color }) => (
                    <Download size={size} color={color} />
                  )}
                >
                  Descargar Comprobante
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Mis Pagos
        </Text>

        {getTotalPendiente() > 0 && (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 600, delay: 100 }}
          >
            <Card style={styles.summaryCard}>
              <Card.Content style={styles.summaryContent}>
                <Text variant="bodyMedium" style={styles.summaryLabel}>
                  Total pendiente
                </Text>
                <Text variant="headlineSmall" style={styles.summaryAmount}>
                  {formatCLP(getTotalPendiente())}
                </Text>
              </Card.Content>
            </Card>
          </MotiView>
        )}

        <Searchbar
          placeholder="Buscar pagos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          theme={{ colors: darkTheme.colors }}
        />

        <FlatList
          data={filtros}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          renderItem={({ item }) => (
            <Chip
              selected={selectedFilter === item}
              onPress={() => setSelectedFilter(item)}
              style={[
                styles.filterChip,
                selectedFilter === item && styles.selectedChip,
              ]}
              textStyle={[
                styles.chipText,
                selectedFilter === item && styles.selectedChipText,
              ]}
            >
              {item}
            </Chip>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      <FlatList
        data={filteredPayments}
        renderItem={renderPayment}
        contentContainerStyle={styles.paymentsList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />

      <FAB
        icon={({ size, color }) => <Plus size={size} color={color} />}
        style={styles.fab}
        onPress={() =>
          Alert.alert('Nuevo Pago', 'Funcionalidad mock - Crear nuevo pago')
        }
        label="Nuevo pago"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  header: {
    padding: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  summaryCard: {
    backgroundColor: darkTheme.colors.primaryContainer,
    marginBottom: spacing.md,
  },
  summaryContent: {
    padding: spacing.md,
    alignItems: 'center',
  },
  summaryLabel: {
    color: darkTheme.colors.primarySelected,
    marginBottom: spacing.xs,
  },
  summaryAmount: {
    color: darkTheme.colors.primarySelected,
    fontWeight: '700',
  },
  searchbar: {
    backgroundColor: darkTheme.colors.surface,
    marginBottom: spacing.md,
  },
  filtersContainer: {
    gap: spacing.sm,
  },
  filterChip: {
    backgroundColor: darkTheme.colors.surface,
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
    color: darkTheme.colors.primarySelected,
  },
  paymentsList: {
    padding: spacing.xl,
    paddingTop: 0,
  },
  paymentCard: {
    backgroundColor: darkTheme.colors.surface,
    marginBottom: spacing.md,
    elevation: 1,
  },
  paymentContent: {
    padding: spacing.lg,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  paymentInfo: {
    flex: 1,
  },
  serviceName: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  paymentDate: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  paymentAmount: {
    marginBottom: spacing.md,
  },
  amount: {
    color: darkTheme.colors.onSurface,
    fontWeight: '700',
  },
  paymentActions: {
    gap: spacing.sm,
  },
  payButton: {
    borderRadius: 20,
  },
  downloadButton: {
    borderRadius: 20,
    borderColor: darkTheme.colors.outline,
  },
  actionButtonContent: {
    height: 40,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
    backgroundColor: darkTheme.colors.primaryContainer,
  },
});
