import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Shield, MapPin, Clock } from 'lucide-react-native';
import { darkTheme, spacing } from '@/theme/theme';
import { useOnboarding } from '@/hooks/useOnboarding';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Seguridad a tu Alcance',
    description: 'Accede a servicios de seguridad profesional las 24 horas del día, donde quiera que estés.',
    icon: Shield,
  },
  {
    id: '2',
    title: 'Reporta y Mantente Seguro',
    description: 'Informa incidentes en tiempo real y ayuda a crear una comunidad más segura.',
    icon: MapPin,
  },
  {
    id: '3',
    title: 'Respuesta Inmediata',
    description: 'Nuestro equipo de profesionales está listo para actuar cuando más lo necesites.',
    icon: Clock,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await completeOnboarding();
    router.replace('/(auth)/login');
  };

  const renderSlide = ({ item, index }: { item: typeof onboardingData[0], index: number }) => {
    const IconComponent = item.icon;
    
    return (
      <View style={styles.slide}>
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600, delay: index * 100 }}
          style={styles.iconContainer}
        >
          <IconComponent size={80} color={darkTheme.colors.primary} strokeWidth={1.5} />
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 + index * 100 }}
        >
          <Text variant="headlineMedium" style={styles.title}>
            {item.title}
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            {item.description}
          </Text>
        </MotiView>
      </View>
    );
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => (
        <MotiView
          key={index}
          animate={{
            backgroundColor: index === currentIndex ? darkTheme.colors.primary : darkTheme.colors.outline,
            scale: index === currentIndex ? 1.2 : 1,
          }}
          transition={{ type: 'timing', duration: 300 }}
          style={styles.dot}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button mode="text" onPress={handleSkip} textColor={darkTheme.colors.outline}>
          Omitir
        </Button>
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {renderDots()}

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.nextButton}
          contentStyle={styles.buttonContent}
        >
          {currentIndex === onboardingData.length - 1 ? 'Comenzar' : 'Siguiente'}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
    color: darkTheme.colors.onSurface,
  },
  description: {
    textAlign: 'center',
    color: darkTheme.colors.onSurfaceVariant,
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    padding: spacing.xl,
  },
  nextButton: {
    borderRadius: 28,
  },
  buttonContent: {
    height: 56,
  },
});