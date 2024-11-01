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
    confirmationPassword?: Array<string>;
}

export type RegistrationFormFields = {
    name: string;
    email: string;
    password: string;
    confirmationPassword: string;
    errors?: RegistrationFormErrors;
};

export type LoginFormErrors = {
    email?: Array<string>;
    password?: Array<string>;
    general?: Array<string>;
}

export type LoginFormFields = {
    email: string;
    password: string;
    errors?: RegistrationFormErrors;
};
export type LoginFormsErrors = {
    email: string;
    password: string;
};

export type CountryCardType = CountryCardFormData & {
    id: string;
};

export type WallMetaInfo = {
    isPublic: boolean;
    createdAt: string;
};

export type Wall = {
    wallMetaInfo: WallMetaInfo;
    countryCards: Array<CountryCardType>;
}
