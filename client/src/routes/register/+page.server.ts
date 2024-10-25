
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
    register: async ({ request }) => {
        console.log('before')
        const data = await request.formData();
        const name = data.get('name')?.toString() ?? '';
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';
        const confirmPassword = data.get('confirm_password')?.toString() ?? '';

        const formValues = { name, email };

        const errors: Record<string, string> = {};

        if (!name) {
            errors.name = 'Name is required.';
        }
        if (!email) {
            errors.email = 'Email is required.';
        }
        if (!password) {
            errors.password = 'Password is required.';
        }
        if (password !== confirmPassword) {
            errors.confirm_password = 'Passwords do not match.';
        }

        if (Object.keys(errors).length > 0) {
            console.log('throwing')
            return fail(400, {
                ...formValues,
                errors
            });
        }

        try {
            const response = await fetch('http://localhost:5072/account/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                const backendErrors: Record<string, string> = {};

                // Assuming errorData is an array of errors from the backend
                errorData.forEach((error: any) => {
                    backendErrors[error.field] = error.message;
                });

                return fail(response.status, {
                    ...formValues,
                    errors: backendErrors
                });
            }

            // Handle successful registration (e.g., set cookies if necessary)
            // cookies.set('sessionid', '...', { path: '/' });

            // Registration and sign-in successful
            throw redirect(303, '/');
        } catch (error) {
            console.error(error);
            return fail(500, {
                ...formValues,
                errors: { general: 'Server error during registration.' }
            });
        }
    }
} satisfies Actions;
