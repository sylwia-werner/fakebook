import { useAuthStore } from '@/stores/useAuthStore';
import { isTokenExpired } from '@/utils/isTokenExpired';

export const checkTokenBeforeRequest = () => {
    const { token, logout } = useAuthStore.getState();

    if (!token || isTokenExpired(token)) {
        logout();
        window.location.href = '/login';
        throw new Error('Session expired');
    }
};
