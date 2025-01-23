// Transformers are functions that transform data from one format to another
// (eg. snake_case is typically used in python, camelCase is preferred for js)
// Also are handy when backend returns data of different type than frontend expects (eg. string instead of number)

import { LoginResponseDTO } from '../dto-types/auth';

export type User = {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    lastLogin: string | null;
    createdAt: string;
    updatedAt: string | null;
};

export const transformLoginData = (response: LoginResponseDTO): User => {
    const {
        uuid,
        first_name,
        last_name,
        email,
        last_login,
        created_at,
        updated_at,
    } = response;

    return {
        id: uuid,
        firstName: first_name,
        lastName: last_name,
        email,
        lastLogin: last_login,
        createdAt: created_at,
        updatedAt: updated_at,
    };
};
