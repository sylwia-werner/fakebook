'use client';

import { FaFacebook } from 'react-icons/fa';
import $ from './Header.module.scss';
import clsx from 'clsx';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const { logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className={$.header}>
            <FaFacebook />
            <button
                type="submit"
                className={clsx($.logoutButton, 'btn')}
                onClick={handleLogout}
            >
                Logout
            </button>
        </header>
    );
};
