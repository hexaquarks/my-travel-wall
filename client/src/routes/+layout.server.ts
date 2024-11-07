import type { LayoutServerLoad } from './$types';
import type { User } from '$lib/types/types';

export const load: LayoutServerLoad = ({ locals }) => {
    return {
        user: locals.user as User | null,
    };
};
