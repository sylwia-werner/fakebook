import { Header } from '@/components/Header/Header';
import { PropsWithChildren } from 'react';
import $ from './layout.module.scss';
import { AuthGuard } from '@/components/Guards/AuthGuard';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <AuthGuard>
            <main>
                <Header />
                <div className={$.content}>{children}</div>
            </main>
        </AuthGuard>
    );
}
