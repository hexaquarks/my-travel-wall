import { apiClient } from '$lib/util/apiClientProxy';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const newCountryCardInfo = await request.json();
        await apiClient.post(
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
