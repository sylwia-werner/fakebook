import { useState } from 'react';
import { loginSchema } from '@/validations/auth';
import { LoginFormType } from '@/types/form/loginForm';

export const useLoginForm = () => {
    const [formState, setFormState] = useState<LoginFormType>({
        email: { value: '', error: '' },
        password: { value: '', error: '' },
    });
    const [isLoading, setIsLoading] = useState(false);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsFormSubmitted(true);

        const formData = {
            email: formState.email.value,
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
        // TODO: Handle form submit when backend is ready
        try {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            // eslint-disable-next-line no-console
            console.log(formData);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formState,
        handleInputChange,
        handleSubmit,
        isLoading,
    };
};
