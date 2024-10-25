
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';

        const formValues = { email }; // We won't include password for security reasons
        const errors: Record<string, string> = {};

        if (!email) {
            errors.email = 'Email is required.';
        }
        if (!password) {
            errors.password = 'Password is required.';
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, {
                ...formValues,
                errors
            });
        }

        try {
            const response = await fetch('http://localhost:5072/account/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                return fail(response.status, {
                    ...formValues,
                    errors: { general: errorData.message }
                });
            }

            // Handle successful login (e.g., set cookies if necessary)
            // cookies.set('sessionid', '...', { path: '/' });

            // Redirect to the homepage after successful login
            throw redirect(303, '/');
        } catch (error) {
            console.error(error);
            return fail(500, {
                ...formValues,
                errors: { general: 'Server error during login.' }
            });
        }
    }
} satisfies Actions;
