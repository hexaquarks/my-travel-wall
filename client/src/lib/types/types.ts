export type CountryCardFormData = {
    country: string;
    startDate?: string;
    endDate?: string;
    pictures?: Array<File>;
    description?: string;
};

export type RegistrationFormErrors = {
    name?: Array<string>;
    email?: Array<string>;
    password?: Array<string>;
    general?: Array<string>;
    confirmationPassword?: Array<string>;
}

export type RegistrationFormFields = {
    name: string;
    email: string;
    password: string;
    confirmationPassword: string;
    errors?: RegistrationFormErrors;
};

export type LoginFormFields = {
    email: string;
    password: string;
};

export type CountryCardType = CountryCardFormData & {
    id: string;
};
