import type { CountryCardType } from "$lib/types/types";

export const defaultCountryCard: CountryCardType = {
    id: "",
    country: "",
    startDate: "",
    endDate: "",
    pictures: [],
    description: "",
};

// Retrieves a YY::XX::DD from a long ISO string.
export function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}
