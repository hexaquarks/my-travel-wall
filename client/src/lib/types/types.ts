export type CountryCardFormData = {
    country: string;
    startDate?: string;
    endDate?: string;
    pictures?: Array<File>;
    description?: string;
};

export type CountryCardType = CountryCardFormData & {
    id: string;
};
