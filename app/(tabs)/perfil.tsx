import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Text,
  Card,
  Button,
  Avatar,
  Divider,
  List,
  Switch,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  CreditCard as Edit3,
  Lock,
  Bell,
  MapPin,
  Wifi,
  LogOut,
  ChevronRight,
  Shield,
  CreditCard,
  FileText,
} from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { useAuth } from '@/hooks/useAuth';
import { mockSolicitudes, mockPagos, mockIncidentes } from '@/data/mockData';

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const [preferences, setPreferences] = useState({
    notifications: true,
    location: true,
    dataOptimization: false,
  });

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: Usuario no encontrado</Text>
      </SafeAreaView>
    );
  }

  const handleLogout = () => {
    Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar Sesión', style: 'destructive', onPress: logout },
    ]);
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Editar Perfil',
      'Funcionalidad mock - Editar información personal'
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Cambiar Contraseña',
      'Funcionalidad mock - Cambio de contraseña'
    );
  };

  const updatePreference = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const getStatsData = () => ({
    servicios: mockSolicitudes.length,
    incidentes: mockIncidentes.filter((i) => i.usuarioId === user.id).length,
    pagos: mockPagos.length,
  });

  const stats = getStatsData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con información del usuario */}
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          style={styles.header}
        >
          <Text variant="headlineMedium" style={styles.title}>
            Mi Perfil
          </Text>
        </MotiView>

        {/* Tarjeta del usuario */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
        >
          <Card style={styles.profileCard}>
            <Card.Content style={styles.profileContent}>
              <View style={styles.profileHeader}>
                <Avatar.Image
                  size={80}
                  source={{
                    uri:
                      user.avatarUrl ||
                      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                  }}
                />
                <View style={styles.profileInfo}>
                  <Text variant="headlineSmall" style={styles.userName}>
                    {user.nombre}
                  </Text>
                  <Text variant="bodyMedium" style={styles.userEmail}>
                    {user.email}
                  </Text>
                  <Text variant="bodySmall" style={styles.userDetails}>
                    RUT: {user.rut} • {user.telefono}
                  </Text>
                </View>
              </View>

              <Button
                mode="outlined"
                onPress={handleEditProfile}
                style={styles.editButton}
                icon={({ size, color }) => <Edit3 size={size} color={color} />}
              >
                Editar Perfil
              </Button>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Estadísticas rápidas */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 400 }}
        >
          <Card style={styles.statsCard}>
            <Card.Content style={styles.statsContent}>
              <Text variant="titleMedium" style={styles.statsTitle}>
                Tu Actividad
              </Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text variant="headlineSmall" style={styles.statNumber}>
                    {stats.servicios}
                  </Text>
                  <Text variant="bodySmall" style={styles.statLabel}>
                    Servicios
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="headlineSmall" style={styles.statNumber}>
                    {stats.incidentes}
                  </Text>
                  <Text variant="bodySmall" style={styles.statLabel}>
                    Incidentes
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="headlineSmall" style={styles.statNumber}>
                    {stats.pagos}
                  </Text>
                  <Text variant="bodySmall" style={styles.statLabel}>
                    Pagos
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Opciones de cuenta */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 600 }}
        >
          <Card style={styles.menuCard}>
            <Card.Content style={styles.menuContent}>
              <Text variant="titleMedium" style={styles.menuTitle}>
                Cuenta
              </Text>

              <List.Item
                title="Cambiar contraseña"
                left={({ color }) => <Lock size={24} color={color} />}
                right={({ color }) => <ChevronRight size={20} color={color} />}
                onPress={handleChangePassword}
                titleStyle={styles.menuItemTitle}
              />

              <Divider style={styles.menuDivider} />

              <List.Item
                title="Historial de servicios"
                left={({ color }) => <Shield size={24} color={color} />}
                right={({ color }) => <ChevronRight size={20} color={color} />}
                onPress={() =>
                  Alert.alert('Historial', 'Ver historial de servicios (Mock)')
                }
                titleStyle={styles.menuItemTitle}
              />

              <List.Item
                title="Mis incidentes"
                left={({ color }) => <FileText size={24} color={color} />}
                right={({ color }) => <ChevronRight size={20} color={color} />}
                onPress={() =>
                  Alert.alert(
                    'Incidentes',
                    'Ver mis incidentes reportados (Mock)'
                  )
                }
                titleStyle={styles.menuItemTitle}
              />

              <List.Item
                title="Historial de pagos"
                left={({ color }) => <CreditCard size={24} color={color} />}
                right={({ color }) => <ChevronRight size={20} color={color} />}
                onPress={() =>
                  Alert.alert('Pagos', 'Ver historial completo de pagos (Mock)')
                }
                titleStyle={styles.menuItemTitle}
              />
            </Card.Content>
          </Card>
        </MotiView>

        {/* Preferencias */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 800 }}
        >
          <Card style={styles.menuCard}>
            <Card.Content style={styles.menuContent}>
              <Text variant="titleMedium" style={styles.menuTitle}>
                Preferencias
              </Text>

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceContent}>
                  <Bell size={24} color={darkTheme.colors.onSurface} />
                  <View style={styles.preferenceText}>
                    <Text style={styles.preferenceTitle}>Notificaciones</Text>
                    <Text style={styles.preferenceDescription}>
                      Recibir alertas de incidentes y servicios
                    </Text>
                  </View>
                </View>
                <Switch
                  value={preferences.notifications}
                  onValueChange={(value) =>
                    updatePreference('notifications', value)
                  }
                  color={darkTheme.colors.primary}
                />
              </View>

              <Divider style={styles.menuDivider} />

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceContent}>
                  <MapPin size={24} color={darkTheme.colors.onSurface} />
                  <View style={styles.preferenceText}>
                    <Text style={styles.preferenceTitle}>
                      Compartir ubicación
                    </Text>
                    <Text style={styles.preferenceDescription}>
                      Permitir servicios basados en ubicación
                    </Text>
                  </View>
                </View>
                <Switch
                  value={preferences.location}
                  onValueChange={(value) => updatePreference('location', value)}
                  color={darkTheme.colors.primary}
                />
              </View>

              <Divider style={styles.menuDivider} />

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceContent}>
                  <Wifi size={24} color={darkTheme.colors.onSurface} />
                  <View style={styles.preferenceText}>
                    <Text style={styles.preferenceTitle}>Ahorro de datos</Text>
                    <Text style={styles.preferenceDescription}>
                      Reducir el uso de datos móviles
                    </Text>
                  </View>
                </View>
                <Switch
                  value={preferences.dataOptimization}
                  onValueChange={(value) =>
                    updatePreference('dataOptimization', value)
                  }
                  color={darkTheme.colors.primary}
                />
              </View>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Logout */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 1000 }}
          style={styles.logoutSection}
        >
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            contentStyle={styles.logoutButtonContent}
            textColor={darkTheme.colors.error}
            icon={({ size }) => (
              <LogOut size={size} color={darkTheme.colors.error} />
            )}
          >
            Cerrar Sesión
          </Button>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.xl,
    paddingBottom: spacing.lg,
  },
  title: {
    color: darkTheme.colors.onSurface,
  },
  profileCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  profileContent: {
    padding: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  userEmail: {
    color: darkTheme.colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  userDetails: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  editButton: {
    borderColor: darkTheme.colors.outline,
  },
  statsCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  statsContent: {
    padding: spacing.lg,
  },
  statsTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: darkTheme.colors.primary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  menuCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  menuContent: {
    padding: spacing.md,
  },
  menuTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.sm,
    paddingLeft: spacing.md,
  },
  menuItemTitle: {
    color: darkTheme.colors.onSurface,
  },
  menuDivider: {
    backgroundColor: darkTheme.colors.outline,
    opacity: 0.3,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  preferenceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  preferenceTitle: {
    color: darkTheme.colors.onSurface,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  preferenceDescription: {
    color: darkTheme.colors.onSurfaceVariant,
    fontSize: 14,
  },
  logoutSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    marginTop: spacing.md,
  },
  logoutButton: {
    borderColor: darkTheme.colors.error,
    borderRadius: 28,
  },
  logoutButtonContent: {
    height: 56,
  },
});
