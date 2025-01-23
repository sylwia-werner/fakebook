'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const NoAuthGuard = ({ children }: { children: React.ReactNode }) => {
    const [isHydrated, setIsHydrated] = useState(false);

    const { token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (token && !isTokenExpired(token)) {
            router.push('/');
        }
    }, [isHydrated, token, router]);

    return <>{children}</>;
};
