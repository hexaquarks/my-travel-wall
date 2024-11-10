import { env } from "$env/dynamic/private";
import { redirect } from '@sveltejs/kit';
import { PUBLIC_BACKEND_SERVER_URL } from "$env/static/public";

import type { PageServerLoad } from "./$types";
import type { WallServerLoadInfo } from "$lib/types/types";

let countriesCache: Array<{ name: string }> = [];

const defaultWallServerLoadValueGet = (): WallServerLoadInfo => {
    var date = new Date();

    return {
        wallInfo: {
            wallMetaInfo: {
                isPublic: false,
                createdAt: date.toISOString(),
            },
            countryCards: []
        },
        countryNamesListFromAPI: [],
    };
};

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (!locals.user) {
        redirect(303, "/login");
    }

    let loadResult: WallServerLoadInfo = defaultWallServerLoadValueGet();

    if (countriesCache.length == 0) {
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

        } catch (error) {
            console.error(`Error in load function for /: ${error}`);
            return loadResult;
        }
    }

    loadResult.countryNamesListFromAPI = countriesCache.map(country => ({ name: country.name }));

    // Fetch country card lists from user's db.
    try {
        const authenticationCookie = cookies.get('authentication_cookie');
        if (!authenticationCookie) {
            throw redirect(303, '/login');
        }
        const cookieHeader = `authentication_cookie=${authenticationCookie}`;
        const response = await fetch(
            `${PUBLIC_BACKEND_SERVER_URL}/wall/`,
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
        loadResult.wallInfo = jsonResponse;

    } catch (error) {
        console.error(`Error in load function for /: ${error}`);
        return {
            wallInfo: null,
            countryListAPIResponse: []
        };
    }
    return loadResult;
};
