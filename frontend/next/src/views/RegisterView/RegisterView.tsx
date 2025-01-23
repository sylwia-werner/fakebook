'use client';

import TextInput from '@/components/Inputs/TextInput/TextInput';
import $ from './RegisterView.module.scss';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import clsx from 'clsx';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RegisterFormType } from '@/types/form/auth';
import { registerSchema } from '@/validations/auth';
import { useRegisterAPI } from '@/hooks/auth/useRegisterAPI';

export const RegisterView = () => {
    const [formState, setFormState] = useState<RegisterFormType>({
        login: { value: '', error: '' },
        password: { value: '', error: '' },
        password2: { value: '', error: '' },
        firstName: { value: '', error: '' },
        lastName: { value: '', error: '' },
        email: { value: '', error: '' },
    });

    const { register, isLoading, error } = useRegisterAPI();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const validateField = (name: keyof RegisterFormType, value: string) => {
        const fieldValidation = registerSchema.shape[name].safeParse(value);

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
                ...prev[name as keyof RegisterFormType],
                value,
            },
        }));

        if (isFormSubmitted) {
            validateField(name as keyof RegisterFormType, value);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsFormSubmitted(true);

        // Taking just formName.value from formState
        const formData = Object.entries(formState).reduce(
            (acc, [key, field]) => ({
                ...acc,
                [key]: field.value,
            }),
            {} as Record<keyof typeof formState, string>,
        );

        const validation = registerSchema.safeParse(formData);

        if (!validation.success) {
            const newState = { ...formState };
            validation.error.errors.forEach(error => {
                const field = error.path[0] as keyof RegisterFormType;
                newState[field] = {
                    ...newState[field],
                    error: error.message,
                };
            });

            setFormState(newState);
            return;
        }

        await register({ ...formData });
    };

    return (
        <section className={$.section}>
            <h1>Register</h1>
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

                    <TextInput
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={formState.password2.value}
                        onChange={handleInputChange}
                        errorMessage={formState.password2.error}
                        required
                    />

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
                        type="text"
                        label="First Name"
                        placeholder="First Name"
                        name="firstName"
                        value={formState.firstName.value}
                        onChange={handleInputChange}
                        errorMessage={formState.firstName.error}
                    />

                    <TextInput
                        type="text"
                        label="Last Name"
                        placeholder="Last Name"
                        name="lastName"
                        value={formState.lastName.value}
                        onChange={handleInputChange}
                        errorMessage={formState.lastName.error}
                    />
                </div>

                {isLoading && <LoadingSpinner />}

                {error && <p className={$.errorMessage}>{error}</p>}

                <button
                    type="submit"
                    className={clsx($.button, $.registerButton, 'btn')}
                >
                    Sign Up
                </button>
            </form>
            <hr className={$.hr} />
            <p>{`Already have an account?`}</p>
            <Link
                href="/login"
                className={clsx($.button, $.loginButton, 'btn')}
            >
                Login
            </Link>
        </section>
    );
};
