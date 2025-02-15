import React, { ChangeEvent, useId } from 'react';
import $ from './TextInput.module.scss';
import clsx from 'clsx';

interface TextInputProps {
    name: string;
    value: string;
    label?: string;
    errorMessage?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'password' | 'email' | 'textarea';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    withAutocomplete?: boolean;
}

export const TextInput = ({
    name,
    value,
    label,
    errorMessage,
    disabled,
    required,
    type = 'text',
    placeholder,
    onChange,
    withAutocomplete = false,
    ...props
}: TextInputProps) => {
    const id = useId();

    return (
        <div className={$.wrapper}>
            {label && (
                <label
                    className={clsx($.label, disabled && $.isDisabled)}
                    htmlFor={id}
                >
                    {label}

                    {required && <span className={$.required}>*</span>}
                </label>
            )}

            <input
                id={id}
                name={name}
                value={value}
                type={type}
                disabled={disabled}
                required={required}
                onChange={onChange}
                placeholder={placeholder}
                className={clsx(
                    $.input,
                    errorMessage && $.isError,
                    disabled && $.isDisabled,
                )}
                {...props}
                autoComplete={withAutocomplete ? 'on' : 'off'}
            />

            {errorMessage && (
                <p role="alert" className={clsx($.errorMessage)}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default TextInput;
