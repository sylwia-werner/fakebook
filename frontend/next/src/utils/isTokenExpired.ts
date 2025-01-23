import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;

    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        return Date.now() >= decoded.exp * 1000;
    } catch {
        return true;
    }
};
