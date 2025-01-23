import { PropsWithChildren } from 'react';
import $ from './layout.module.scss';
import { FaFacebook } from 'react-icons/fa';
import { NoAuthGuard } from '@/components/Guards/NoAuthGuard';

export default function NoAuthLayout({ children }: PropsWithChildren) {
    return (
        <NoAuthGuard>
            <main className={$.main}>
                <div className={$.wrapper}>
                    <FaFacebook />
                    {children}
                </div>
            </main>
        </NoAuthGuard>
    );
}
