import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { hasSeenOnboarding } = useOnboarding();

  useEffect(() => {
    if (!authLoading && hasSeenOnboarding !== null) {
      if (!hasSeenOnboarding) {
        router.replace('/(onboarding)');
      } else if (!isAuthenticated) {
        router.replace('/(auth)/login');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, authLoading, hasSeenOnboarding]);

  return <LoadingSpinner text="Inicializando..." />;
}