import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '@/types';
import { mockUser } from '@/data/mockData';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        setIsAuthenticated(true);
        setUser(mockUser);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - en producción aquí iría la lógica real
      if (email === 'sebastian@example.com' && password === 'password') {
        await AsyncStorage.setItem('auth_token', 'mock_token');
        setIsAuthenticated(true);
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const register = async (userData: Partial<Usuario>, password: string): Promise<boolean> => {
    try {
      // Mock registro
      await AsyncStorage.setItem('auth_token', 'mock_token');
      setIsAuthenticated(true);
      setUser({ ...mockUser, ...userData } as Usuario);
      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    register,
    logout,
  };
}