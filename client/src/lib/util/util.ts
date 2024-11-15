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

// Used by WorldMap to cut the Antartica part from it. No one travels there.
export const WORLD_MAP_ANTARTICA_SIZE_TO_CUT = 150;
