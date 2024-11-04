import type { Cookies } from '@sveltejs/kit';

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

    const response = await fetch(`http://localhost:5072${endpoint}`, {
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
