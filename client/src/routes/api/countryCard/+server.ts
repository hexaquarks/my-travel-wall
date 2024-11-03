import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const authenticationCookie = cookies.get('authentication_cookie');
        if (!authenticationCookie) {
            return json({ error: 'Not authenticated' }, { status: 401 });
        }

        const cookieHeader = `authentication_cookie=${authenticationCookie}`;
        const newCountryCardInfo = await request.json();

        // Update card in backend withe the new card info.
        const response = await fetch('http://localhost:5072/country', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader,
            },
            body: JSON.stringify(newCountryCardInfo),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error saving card: ${response.status} ${errorText}`);
            return json({ error: 'Failed to save card' }, { status: response.status });
        }

        return json({ success: true });
    } catch (error) {
        console.error(`Error in API endpoint: ${error}`);
        return json({ error: 'An error occurred while saving the card' }, { status: 500 });
    }
};
