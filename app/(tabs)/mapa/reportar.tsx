import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Text, TextInput, Button, Card, RadioButton, Switch } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { ArrowLeft, MapPin, Camera, Video, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { darkTheme, spacing } from '@/theme/theme';

const categorias = ['Seguridad', 'Tránsito', 'Servicios', 'Emergencia', 'Otro'];

export default function ReportarIncidenteScreen() {
  const [categoria, setCategoria] = useState('Seguridad');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacionActual, setUbicacionActual] = useState(true);
  const [esAnonimo, setEsAnonimo] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImagePicker = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Funcionalidad mock', 'Selección de imagen simulada en web');
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Error', 'Se requieren permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFotos([...fotos, result.assets[0].uri]);
    }
  };

  const handleCameraLaunch = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Funcionalidad mock', 'Cámara simulada en web');
      return;
    }

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Error', 'Se requieren permisos para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFotos([...fotos, result.assets[0].uri]);
    }
  };

  const handleSubmit = async () => {
    if (!descripcion.trim()) {
      Alert.alert('Error', 'Por favor describe el incidente');
      return;
    }

    setIsLoading(true);

    // Simular envío
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Reporte Enviado',
        'Tu reporte ha sido enviado exitosamente. Gracias por ayudar a mejorar la seguridad de la comunidad.',
        [
          { 
            text: 'OK', 
            onPress: () => router.back()
          }
        ]
      );
    }, 2000);
  };

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
            Reportar Incidente
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Ayuda a mantener segura nuestra comunidad
          </Text>
        </MotiView>

        {/* Categoría */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 200 }}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Categoría del Incidente
              </Text>
              <RadioButton.Group onValueChange={setCategoria} value={categoria}>
                {categorias.map((cat) => (
                  <View key={cat} style={styles.radioItem}>
                    <RadioButton value={cat} />
                    <Text style={styles.radioLabel}>{cat}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Descripción */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 400 }}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Descripción
              </Text>
              <TextInput
                placeholder="Describe brevemente lo que ocurrió..."
                value={descripcion}
                onChangeText={setDescripcion}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.textArea}
                theme={{ colors: darkTheme.colors }}
              />
            </Card.Content>
          </Card>
        </MotiView>

        {/* Ubicación */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 600 }}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Ubicación
              </Text>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Usar ubicación actual</Text>
                <Switch
                  value={ubicacionActual}
                  onValueChange={setUbicacionActual}
                  color={darkTheme.colors.primary}
                />
              </View>
              {!ubicacionActual && (
                <TextInput
                  placeholder="Ingresa la ubicación manualmente"
                  mode="outlined"
                  style={styles.input}
                  theme={{ colors: darkTheme.colors }}
                />
              )}
              <Text variant="bodySmall" style={styles.locationNote}>
                {ubicacionActual ? 
                  'Se usará tu ubicación actual para el reporte' : 
                  'Especifica la ubicación del incidente'
                }
              </Text>
            </Card.Content>
          </Card>
        </MotiView>

        {/* Multimedia */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 800 }}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Evidencia (Opcional)
              </Text>
              <View style={styles.mediaButtons}>
                <Button
                  mode="outlined"
                  onPress={handleCameraLaunch}
                  style={styles.mediaButton}
                  icon={({ size, color }) => <Camera size={size} color={color} />}
                >
                  Tomar Foto
                </Button>
                <Button
                  mode="outlined"
                  onPress={handleImagePicker}
                  style={styles.mediaButton}
                  icon={({ size, color }) => <Video size={size} color={color} />}
                >
                  Galería
                </Button>
              </View>
              {fotos.length > 0 && (
                <Text variant="bodySmall" style={styles.mediaCount}>
                  {fotos.length} archivo(s) adjunto(s)
                </Text>
              )}
            </Card.Content>
          </Card>
        </MotiView>

        {/* Privacidad */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 1000 }}
        >
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleMedium" style={styles.cardTitle}>
                Privacidad
              </Text>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Reportar de forma anónima</Text>
                <Switch
                  value={esAnonimo}
                  onValueChange={setEsAnonimo}
                  color={darkTheme.colors.primary}
                />
              </View>
              <Text variant="bodySmall" style={styles.privacyNote}>
                {esAnonimo ? 
                  'Tu identidad no será visible en el reporte' : 
                  'Tu perfil será visible para otros usuarios'
                }
              </Text>
            </Card.Content>
          </Card>
        </MotiView>
      </ScrollView>

      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 1200 }}
        style={styles.footer}
      >
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.submitButton}
          contentStyle={styles.buttonContent}
          icon={({ size, color }) => <AlertTriangle size={size} color={color} />}
        >
          Enviar Reporte
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
    paddingBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: darkTheme.colors.onSurfaceVariant,
  },
  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: darkTheme.colors.surface,
  },
  cardContent: {
    padding: spacing.lg,
  },
  cardTitle: {
    color: darkTheme.colors.onSurface,
    marginBottom: spacing.md,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  radioLabel: {
    color: darkTheme.colors.onSurface,
    marginLeft: spacing.sm,
  },
  textArea: {
    backgroundColor: darkTheme.colors.background,
    minHeight: 100,
  },
  input: {
    backgroundColor: darkTheme.colors.background,
    marginTop: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    color: darkTheme.colors.onSurface,
    flex: 1,
  },
  locationNote: {
    color: darkTheme.colors.onSurfaceVariant,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  mediaButton: {
    flex: 1,
    borderColor: darkTheme.colors.outline,
  },
  mediaCount: {
    color: darkTheme.colors.secondary,
    fontWeight: '600',
  },
  privacyNote: {
    color: darkTheme.colors.onSurfaceVariant,
    marginTop: spacing.sm,
    fontStyle: 'italic',
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