import type { Cookies } from '@sveltejs/kit';
import { env } from "$env/dynamic/public";

const BACKEND_URL = env.PUBLIC_BACKEND_SERVER_URL;

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {},
    cookies?: Cookies
): Promise<Response> {
    const authenticationCookie = cookies?.get('authentication_cookie');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (authenticationCookie) {
        //@ts-ignore
        headers['Cookie'] = `authentication_cookie=${authenticationCookie}`;
    }

    console.log(`the url is ${BACKEND_URL}`)

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }

    return response;
}
