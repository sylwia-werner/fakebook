type FormFieldType = {
    value: string;
    error: string;
};

export type LoginFormType = {
    login: FormFieldType;
    password: FormFieldType;
};

export type RegisterFormType = {
    login: FormFieldType;
    password: FormFieldType;
    password2: FormFieldType;
    firstName: FormFieldType;
    lastName: FormFieldType;
    email: FormFieldType;
};
