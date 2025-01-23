import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/services/transformers/transformLoginData';

type AuthStore = {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        set => ({
            user: null,
            token: null,
            setUser: user => set({ user }),
            setToken: token => set({ token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage',
        },
    ),
);
