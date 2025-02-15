'use client';

import TextInput from '@/components/Inputs/TextInput/TextInput';
import $ from './LoginView.module.scss';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import clsx from 'clsx';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { LoginFormType } from '@/types/form/auth';
import { loginSchema } from '@/validations/auth';
import { useLoginAPI } from '@/hooks/auth/useLoginAPI';

export const LoginView = () => {
    const [formState, setFormState] = useState<LoginFormType>({
        login: { value: '', error: '' },
        password: { value: '', error: '' },
    });

    const { login, isLoading, error } = useLoginAPI();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const validateField = (name: keyof LoginFormType, value: string) => {
        const fieldValidation = loginSchema.shape[name].safeParse(value);

        setFormState(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                error: !fieldValidation.success
                    ? fieldValidation.error.errors[0].message
                    : '',
            },
        }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormState(prev => ({
            ...prev,
            [name]: {
                ...prev[name as keyof LoginFormType],
                value,
            },
        }));

        if (isFormSubmitted) {
            validateField(name as keyof LoginFormType, value);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsFormSubmitted(true);

        const formData = {
            login: formState.login.value,
            password: formState.password.value,
        };

        const validation = loginSchema.safeParse(formData);

        if (!validation.success) {
            const newState = { ...formState };
            validation.error.errors.forEach(error => {
                const field = error.path[0] as keyof LoginFormType;
                newState[field] = {
                    ...newState[field],
                    error: error.message,
                };
            });

            setFormState(newState);
            return;
        }

        await login({
            login: formData.login,
            password: formData.password,
        });
    };

    return (
        <section className={$.section}>
            <h1>Login</h1>
            <form className={$.form} onSubmit={handleSubmit}>
                <div className={$.inputs}>
                    <TextInput
                        type="text"
                        label="Login"
                        placeholder="Login"
                        name="login"
                        value={formState.login.value}
                        onChange={handleInputChange}
                        errorMessage={formState.login.error}
                        withAutocomplete
                        required
                    />

                    <TextInput
                        type="password"
                        label="Password"
                        placeholder="Password"
                        name="password"
                        value={formState.password.value}
                        onChange={handleInputChange}
                        errorMessage={formState.password.error}
                        required
                    />
                </div>

                {isLoading && <LoadingSpinner />}
                {error && <p className={$.errorMessage}>{error}</p>}

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
