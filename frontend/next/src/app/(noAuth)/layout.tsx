import { PropsWithChildren } from 'react';
import $ from './layout.module.scss';
import { FaFacebook } from 'react-icons/fa';

export default function NoAuthLayout({ children }: PropsWithChildren) {
    return (
        <main className={$.main}>
            <div className={$.wrapper}>
                <FaFacebook />
                {children}
            </div>
        </main>
    );
}
