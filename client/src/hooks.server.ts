import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const cookieHeader = event.request.headers.get('cookie') || '';

    const response = await fetch('http://localhost:5072/account/me', {
        method: 'GET',
        headers: {
            'Cookie': cookieHeader,
        },
        credentials: "include",
    });

    if (response.ok) {
        const user = await response.json();
        event.locals.user = user;
        console.log(user);
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
};
