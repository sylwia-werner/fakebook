import { useState } from 'react';
import { FetchError } from '@/services/types';
import { signUp } from '@/services/api/auth';
import { useRouter } from 'next/navigation';

export type RegisterApiType = {
    login: string;
    password: string;
    password2: string;
    firstName: string;
    lastName: string;
    email: string;
};

export const useRegisterAPI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const register = async ({
        login,
        password,
        password2,
        email,
        firstName,
        lastName,
    }: RegisterApiType) => {
        setIsLoading(true);
        setError(null);

        try {
            const hasSignedUp = await signUp({
                login,
                password,
                password2,
                email,
                firstName,
                lastName,
            });

            if (hasSignedUp) {
                router.push('/login');
            }
        } catch (error) {
            if (error instanceof FetchError && 'error' in error) {
                setError(
                    error?.error || 'Something went wrong. Try again later.',
                );
                return;
            }
            setError('Something went wrong. Try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    return {
        register,
        isLoading,
        error,
    };
};
