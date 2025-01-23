import {
    LoginRequestData,
    LoginResponseDTO,
    RegisterRequestData,
    RegisterResponseDTO,
} from '../dto-types/auth';
import { fetchApi } from '../fetchApi';
import { transformLoginData, User } from '../transformers/transformLoginData';

export const signIn = async ({
    login,
    password,
}: LoginRequestData): Promise<{ user: User; headers: Headers }> => {
    const { data, headers } = await fetchApi<LoginResponseDTO>({
        path: '/login',
        method: 'POST',
        config: { body: JSON.stringify({ login, password }) },
    });

    return {
        user: transformLoginData(data),
        headers: headers,
    };
};

export const signUp = async ({
    login,
    password,
    password2,
    email,
    name,
    surname,
}: RegisterRequestData): Promise<boolean> => {
    const { data } = await fetchApi<RegisterResponseDTO>({
        path: '/register',
        method: 'POST',
        config: {
            body: JSON.stringify({
                login,
                password,
                password2,
                email,
                name,
                surname,
            }),
        },
    });

    const isSuccessfulSignUp = typeof data === 'object' && data !== null;

    return isSuccessfulSignUp;
};
