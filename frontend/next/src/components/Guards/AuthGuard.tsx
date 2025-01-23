'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

export const AuthGuard = ({ children }: PropsWithChildren) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const { logout } = useAuthStore();
    const token = useAuthStore(state => state.token);
    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated && (!token || isTokenExpired(token))) {
            logout();
            router.push('/login');
        }
    }, [isHydrated, token, router, logout]);

    return <>{children}</>;
};
