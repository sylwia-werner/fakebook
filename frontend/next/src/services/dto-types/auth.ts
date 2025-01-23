export type RegisterRequestData = {
    login: string;
    password: string;
    password2: string;
    email?: string;
    name?: string;
    surname?: string;
};

export type RegisterResponseDTO = {
    uuid: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    last_login: string | null;
    created_at: string;
    updated_at: string | null;
};

export type LoginRequestData = {
    login: string;
    password: string;
};

export type LoginResponseDTO = {
    uuid: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    last_login: string | null;
    created_at: string;
    updated_at: string | null;
};
