import { apiClient } from '$lib/util/apiClientProxy';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const newWallInfo = await request.json();
        await apiClient.post(
            '/wall',
            {
                method: 'POST',
                body: JSON.stringify(newWallInfo)
            },
            cookies);
        return json({ success: true });
    } catch (error) {
        return json({ error: 'Failed to save wall' }, { status: 500 });
    }
};

