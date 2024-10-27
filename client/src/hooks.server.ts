import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    console.log("trying to fetch on me");
    const response = await fetch('http://localhost:5072/account/me', {
        method: 'GET',
        headers: {
            cookie: event.request.headers.get('cookie') || '',
        },
        credentials: 'include',
    });

    console.log(response.ok);
    if (response.ok) {
        const user = await response.json();
        event.locals.user = user; // Store user info in locals
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
};
