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

const MOCK_IMAGE_POOL = [
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg",
    "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
    "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg",
    "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg",
    "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg",
    "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    "https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg"
];

// Temporary images for the country card thumbnails and image previewer.
// TODO: Connect real image hosting third-party of course.
export function getRandomImages(count: number): string[] {
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * MOCK_IMAGE_POOL.length);
        results.push(MOCK_IMAGE_POOL[randomIndex]);
    }
    return results;
}
