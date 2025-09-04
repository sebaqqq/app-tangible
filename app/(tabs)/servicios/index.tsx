import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Searchbar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import {
  Car,
  User,
  Chrome as Home,
  Users,
  Building,
  ArrowRight,
} from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { mockServicios } from '@/data/mockData';
import { formatCLP } from '@/utils/format';

const categorias = [
  'Todas',
  'Automotriz',
  'Personal',
  'Inmobiliaria',
  'Ciudadana',
  'Empresarial',
];

const iconMap = {
  car: Car,
  'shield-check': User,
  home: Home,
  users: Users,
  building: Building,
};

export default function ServiciosScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const router = useRouter();

  const filteredServices = mockServicios.filter((servicio) => {
    const matchesSearch =
      servicio.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || servicio.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderService = ({
    item,
    index,
  }: {
    item: (typeof mockServicios)[0];
    index: number;
  }) => {
    const IconComponent = iconMap[item.icono as keyof typeof iconMap] || User;

    return (
      <MotiView
        from={{ opacity: 0, translateX: 30 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 500, delay: index * 100 }}
      >
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/servicios/${item.id}`)}
          style={styles.serviceItem}
        >
          <Card style={styles.serviceCard}>
            <Card.Content style={styles.serviceContent}>
              <View style={styles.serviceHeader}>
                <View style={styles.iconContainer}>
                  <IconComponent
                    size={24}
                    color={darkTheme.colors.primary}
                    strokeWidth={2}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text variant="titleMedium" style={styles.serviceName}>
                    {item.nombre}
                  </Text>
                  <Text variant="bodySmall" style={styles.serviceCategory}>
                    {item.categoria}
                  </Text>
                </View>
                <ArrowRight
                  size={20}
                  color={darkTheme.colors.onSurfaceVariant}
                />
              </View>

              <Text variant="bodyMedium" style={styles.serviceDescription}>
                {item.descripcion}
              </Text>

              {item.precio && (
                <Text variant="titleMedium" style={styles.servicePrice}>
                  {formatCLP(item.precio)}/mes
                </Text>
              )}
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Servicios
        </Text>

        <Searchbar
          placeholder="Buscar servicios..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          theme={{ colors: darkTheme.colors }}
        />

        <FlatList
          data={categorias}
          horizontal
          showsHorizontalScrollIndicator={false}
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
      </View>

      <FlatList
        data={filteredServices}
        renderItem={renderService}
        contentContainerStyle={styles.servicesList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
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
    marginBottom: spacing.lg,
  },
  searchbar: {
    backgroundColor: darkTheme.colors.surface,
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    gap: spacing.sm,
  },
  categoryChip: {
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
    color: darkTheme.colors.primary,
  },
  servicesList: {
    padding: spacing.xl,
    paddingTop: 0,
  },
  serviceItem: {
    marginBottom: spacing.md,
  },
  serviceCard: {
    backgroundColor: darkTheme.colors.surface,
    elevation: 2,
  },
  serviceContent: {
    padding: spacing.lg,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: darkTheme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  serviceInfo: {
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
    lineHeight: 20,
  },
  servicePrice: {
    color: darkTheme.colors.primary,
    fontWeight: '700',
  },
});
