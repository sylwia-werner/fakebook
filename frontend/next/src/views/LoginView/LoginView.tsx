'use client';

import TextInput from '@/components/Inputs/TextInput/TextInput';
import $ from './LoginView.module.scss';
import { useLoginForm } from '@/hooks/useLoginForm';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import clsx from 'clsx';
import Link from 'next/link';

export const LoginView = () => {
    const { handleInputChange, handleSubmit, formState, isLoading } =
        useLoginForm();

    return (
        <section className={$.section}>
            <h1>Login</h1>
            <form className={$.form} onSubmit={handleSubmit}>
                <div className={$.inputs}>
                    <TextInput
                        type="email"
                        label="Email"
                        placeholder="Email"
                        name="email"
                        value={formState.email.value}
                        onChange={handleInputChange}
                        errorMessage={formState.email.error}
                    />

                    <TextInput
                        type="password"
                        label="Password"
                        placeholder="Password"
                        name="password"
                        value={formState.password.value}
                        onChange={handleInputChange}
                        errorMessage={formState.password.error}
                    />
                </div>

                {isLoading && <LoadingSpinner />}
                <button
                    type="submit"
                    className={clsx($.button, $.loginButton, 'btn')}
                >
                    Sign in
                </button>
            </form>
            <hr className={$.hr} />
            <p>{`Don't have an account?`}</p>
            <Link
                href="/register"
                className={clsx($.button, $.registerButton, 'btn')}
            >
                Register
            </Link>
        </section>
    );
};
