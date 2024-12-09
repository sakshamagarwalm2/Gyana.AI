import create from 'zustand';
import { api } from '../services/api';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  name: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  name: null,
  email: null,
  login: async (email, password) => {
    try {
      const response = await api.login(email, password);
      if (response.success) {
        set({ 
          isAuthenticated: true, 
          userId: response.userId,
          name: response.name,
          email: response.email
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },
  register: async (name, email, password) => {
    try {
      const response = await api.register(name, email, password);
      if (response.success) {
        set({ 
          isAuthenticated: true, 
          userId: response.userId,
          name: response.name,
          email: response.email
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  },
  logout: () => set({ 
    isAuthenticated: false, 
    userId: null,
    name: null,
    email: null
  }),
}));