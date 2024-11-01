import { redirect } from '@sveltejs/kit';

// TODO: Make env variable
const SERVER_COOKIE_NAME: string = "authentication_cookie";

export const actions = {
    default: async ({ cookies }) => {
        const sessionCookie = cookies.get(SERVER_COOKIE_NAME);

        // Delete the session cookie
        cookies.delete(SERVER_COOKIE_NAME, { path: '/' });

        await fetch('http://localhost:5072/account/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${SERVER_COOKIE_NAME}=${sessionCookie}`
            },
        });

        // Redirect to home page
        throw redirect(303, '/');
    }
};
