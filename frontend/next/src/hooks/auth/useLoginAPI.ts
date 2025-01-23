import { useState } from 'react';
import { FetchError } from '@/services/types';
import { useAuthStore } from '@/stores/useAuthStore';
import { signIn } from '@/services/api/auth';
import { useRouter } from 'next/navigation';

export type LoginApiType = {
    login: string;
    password: string;
};

export const useLoginAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUser, setToken } = useAuthStore();
    const router = useRouter();

    const login = async ({ login, password }: LoginApiType) => {
        setIsLoading(true);
        setError(null);

        try {
            const { user, headers } = await signIn({ login, password });

            const authToken = headers.get('Authorization');

            if (authToken) {
                const token = authToken.split(' ')[1];
                setToken(token);
                setUser(user);
                router.push('/');
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
    };
};
