import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      token: null,

      login: async (email: string, password: string) => {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email === 'admin@collegeNetwork.edu' && password === 'admin123') {
            const adminUser: User = {
              id: 'admin-1',
              username: 'admin',
              email: 'admin@collegeNetwork.edu',
              fullName: 'Admin User',
              college: 'College Network',
              year: 'Admin',
              avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              bio: 'Platform Administrator',
              followers: 0,
              following: 0,
              isVerified: true,
              joinDate: '2024-01-01'
            };
            
            set({
              user: adminUser,
              isAuthenticated: true,
              isAdmin: true,
              token: 'admin-token-123'
            });
            return true;
          } else if (email && password) {
            const mockUser: User = {
              id: '1',
              username: 'sarah_chen',
              email: email,
              fullName: 'Sarah Chen',
              college: 'Stanford University',
              year: 'Senior',
              avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
              bio: 'Computer Science major passionate about AI and machine learning.',
              followers: 342,
              following: 189,
              isVerified: true,
              joinDate: '2024-01-15'
            };
            
            set({
              user: mockUser,
              isAuthenticated: true,
              isAdmin: false,
              token: 'user-token-123'
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          token: null
        });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        token: state.token,
      }),
    }
  )
);