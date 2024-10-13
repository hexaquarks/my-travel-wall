import { env } from "$env/dynamic/private";
import type { PageServerLoad } from "./$types";

let countriesCache: Array<any> = [];

export const load: PageServerLoad = async () => {
    if (countriesCache.length > 0) {
        return {
            countryListAPIResponse: countriesCache
        };
    }

    try {
        const response = await fetch(
            "https://api.countrystatecity.in/v1/countries",
            {
                headers: {
                    "X-CSCAPI-KEY": env.COUNTRIES_API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        const countries = await response.json();
        countriesCache = countries; // TODO: Damn data from +page.server.ts is cached by default actually! 
        console.log("mhm");

        return {
            countryListAPIResponse: countries
        };
    } catch (error) {
        console.error(`Error in load function for /: ${error}`);
        return {
            countryListAPIResponse: []
        };
    }
};
