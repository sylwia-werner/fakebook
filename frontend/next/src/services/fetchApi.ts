import { CONFIG_HAS_API_TRAILING_SLASH, CONFIG_URL_API } from '@/config';
import { FetchError } from './types';
import { useAuthStore } from '@/stores/useAuthStore';
import { checkTokenBeforeRequest } from './checkAuth';

type ValidPath = `/${string}`;

type Config = RequestInit & {
    signal?: AbortSignal;
};

const getToken = () => useAuthStore.getState().token;

type FetchApiType = {
    path: ValidPath;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    config?: Config;
};
export const fetchApi = async <T>({ path, method, config }: FetchApiType) => {
    const { ...init } = config;

    checkTokenBeforeRequest();

    if (method === 'GET' && init.body) {
        throw new Error('GET requests cannot have a body');
    }
    init.method = method;

    const token = getToken();

    const url =
        CONFIG_URL_API + path + (CONFIG_HAS_API_TRAILING_SLASH ? '/' : '');

    const response: Response = await fetch(url, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new FetchError(response.status, errorData.error);
    }

    const data = await response.json();
    if (config?.signal && config.signal.aborted) {
        throw new Error('Aborted');
    }
    return {
        data: data as T,
        headers: response.headers,
    };
};
