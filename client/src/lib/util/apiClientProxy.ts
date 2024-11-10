import type { Cookies } from '@sveltejs/kit';

import { PUBLIC_BACKEND_SERVER_URL } from "$env/static/public";

export const apiClient = {
    async post(
        endpoint: string,
        data: RequestInit,
        cookies?: Cookies
    ) {
        const authenticationCookie = cookies?.get('authentication_cookie');
        const headers = {
            'Content-Type': 'application/json',
        };

        if (authenticationCookie) {
            //@ts-ignore
            headers['Cookie'] = `authentication_cookie=${authenticationCookie}`;
        }

        const response = await fetch(`${PUBLIC_BACKEND_SERVER_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: data.body,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        return response.json();
    },
};

