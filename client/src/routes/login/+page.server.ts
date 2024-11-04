import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { LoginFormFields, LoginFormErrors } from "$lib/types/types.js";
import { populateErrorMessagesReceivedFromBackend } from '$lib/util/formUtil';
import { PUBLIC_BACKEND_SERVER_URL } from "$env/static/public";

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';

        // The formValues that can have an error and might be brought
        // back to the user.
        const formValues = { email, password };

        const errors: LoginFormErrors = {};

        try {
            const response = await fetch(`${PUBLIC_BACKEND_SERVER_URL}/account/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                // TODO: Indicate to client that this user was not found in the database.

                populateErrorMessagesReceivedFromBackend(errorData, errors);
                console.log(errors);

                return fail(response.status, {
                    ...formValues,
                    errors
                });
            }

            if (Object.keys(errors).length > 0) {
                return fail(400, {
                    ...formValues,
                    errors
                });
            }

            // Extract the 'Set-Cookie' header from the backend response
            const setCookieHeader = response.headers.get('Set-Cookie');
            console.log(`Set-Cookie header: ${setCookieHeader}`);

            cookies.set('Set-Cookie', setCookieHeader ?? "", { path: '/' });

            if (setCookieHeader) {
                const cookieParts = setCookieHeader.split(';')[0];
                const [cookieName, cookieValue] = cookieParts.split('=');

                // Set the cookie in the SvelteKit
                cookies.set(cookieName.trim(), cookieValue.trim(), {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'lax',
                });
                console.log("established cookies");
            }

            console.log("login successsful in frontend");

        } catch (error) {
            return fail(500, {
                ...formValues,
                errors: { general: ['Server error during registration.'] }
            });
        }

        // TODO :Registration and sign-in successful
        redirect(303, '/wall');
    }
} satisfies Actions;
