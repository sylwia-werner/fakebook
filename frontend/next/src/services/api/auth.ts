import { LoginResponseDTO, RegisterResponseDTO } from '../dto-types/auth';
import { fetchApi } from '../fetchApi';
import { transformLoginData, User } from '../transformers/transformLoginData';

type LoginRequestData = {
    login: string;
    password: string;
};

export const signIn = async ({
    login,
    password,
}: LoginRequestData): Promise<{ user: User; headers: Headers }> => {
    const { data, headers } = await fetchApi<LoginResponseDTO>({
        checkToken: false,
        path: '/login/',
        method: 'POST',
        config: { body: JSON.stringify({ login, password }) },
    });

    return {
        user: transformLoginData(data),
        headers: headers,
    };
};

type RegisterRequestData = {
    login: string;
    password: string;
    password2: string;
    email?: string;
    firstName?: string;
    lastName?: string;
};

export const signUp = async ({
    login,
    password,
    password2,
    email,
    firstName,
    lastName,
}: RegisterRequestData): Promise<boolean> => {
    const requestBody = {
        login,
        password,
        password2,
        ...(email && { email }),
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName }),
    };
    const { data } = await fetchApi<RegisterResponseDTO>({
        checkToken: false,
        path: '/register/',
        method: 'POST',
        config: {
            body: JSON.stringify({ ...requestBody }),
        },
    });

    const isSuccessfulSignUp = typeof data === 'object' && data !== null;

    return isSuccessfulSignUp;
};
