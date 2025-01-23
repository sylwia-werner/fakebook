import { useState } from 'react';
import { FetchError } from '@/services/types';
import { useAuthStore } from '@/store/useAuthStore';
import { signIn } from '@/services/api/auth';

export type LoginApiType = {
    login: string;
    password: string;
};

export const useLoginAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState(null);
    const { setUser, setToken } = useAuthStore();

    const login = async ({ login, password }: LoginApiType) => {
        setIsLoading(true);
        setError(null);

        try {
            const { user, headers } = await signIn({ login, password });

            const authToken = headers.get('Authorization');

            if (authToken) {
                setToken(authToken);
                setUser(user);
            }
        } catch (error) {
            if (error instanceof FetchError && error.status === 401) {
                setError('Invalid login or password.');
                return;
            }
            setError('Something went wrong. Try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    return {
        login,
        isLoading,
        error,
        userData,
    };
};
