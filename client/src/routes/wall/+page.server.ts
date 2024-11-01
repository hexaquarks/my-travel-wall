import { env } from "$env/dynamic/private";
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";
import type { CountryCardType, Wall } from "$lib/types/types";

let countriesCache: Array<any> = [];

// const getWallCountryCardsFromResponse = (res: JSON) => Array < CountryCardType > {
//
// }

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (!locals.user) {
        redirect(303, "/login");
    }

    let countryListAPIResponse: any;
    let countryCardList: Array<CountryCardType>;

    // Fetch country card lists from user's db.
    try {
        const authenticationCookie = cookies.get('authentication_cookie');
        if (!authenticationCookie) {
            throw redirect(303, '/login');
        }
        const cookieHeader = `authentication_cookie=${authenticationCookie}`;
        const response = await fetch(
            "http://localhost:5072/wall/",
            {
                method: 'GET',
                headers: {
                    'Cookie': cookieHeader,
                },
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch countries from user's wall");
        }

        const jsonResponse = await response.json();
        const wallInfo: Wall = jsonResponse;

        countryCardList = wallInfo["countryCards"];

    } catch (error) {
        console.error(`Error in load function for /: ${error}`);
        return {
            countryCardsList: [],
            countryListAPIResponse: []
        };
    }

    if (countriesCache.length > 0) {
        return {
            countryCardList,
            countryListAPIResponse: countriesCache
        };
    }

    // Fetch countries list for dropdown
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

        countryListAPIResponse = countries;

    } catch (error) {
        console.error(`Error in load function for /: ${error}`);
        return {
            countryCardsList: [],
            countryListAPIResponse: []
        };
    }

    return {
        countryCardList,
        countryListAPIResponse
    }
};
