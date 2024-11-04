import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { CountryCardType, WallType } from '$lib/types/types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const authenticationCookie = cookies.get('authentication_cookie');
        if (!authenticationCookie) {
            return json({ error: 'Not authenticated' }, { status: 401 });
        }

        const cookieHeader = `authentication_cookie=${authenticationCookie}`;
        const newWallInfo = await request.json();

        // Update wall in backend withe the wall's info.
        const response = await fetch('http://localhost:5072/wall', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
            },
            body: JSON.stringify(newWallInfo),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error saving wall: ${response.status} ${errorText} `);
            return json({ error: 'Failed to save wall' }, { status: response.status });
        }

        return json({ success: true });
    } catch (error) {
        console.error(`Error in API endpoint: ${error} `);
        return json({ error: 'An error occurred while saving the wall' }, { status: 500 });
    }
};
