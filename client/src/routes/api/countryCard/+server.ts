import { apiFetch } from '$lib/util/apiClientProxy';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const newCountryCardInfo = await request.json();
        await apiFetch(
            '/country',
            {
                method: 'POST',
                body: JSON.stringify(newCountryCardInfo)
            },
            cookies);
        return json({ success: true });
    } catch (error) {
        return json({ error: 'Failed to save card' }, { status: 500 });
    }
};
