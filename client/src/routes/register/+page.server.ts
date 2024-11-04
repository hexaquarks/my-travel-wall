import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { RegistrationFormFields, RegistrationFormErrors } from "$lib/types/types.js";
import { populateErrorMessagesReceivedFromBackend } from '$lib/util/formUtil';
import { PUBLIC_BACKEND_SERVER_URL } from "$env/static/public";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString() ?? '';
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';
        const confirmPassword = data.get('confirm_password')?.toString() ?? '';

        // The formValues that can have an error and might be brought
        // back to the user.
        const formValues = { name, email, password, confirmPassword };

        const errors: RegistrationFormErrors = {};

        try {
            const response = await fetch(`${PUBLIC_BACKEND_SERVER_URL}/account/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();

                populateErrorMessagesReceivedFromBackend(errorData, errors);

                return fail(response.status, {
                    ...formValues,
                    errors
                });
            }

            // NOTE: It seems like skelton UI's input variant handles the 
            // cases where it's empty. i.e., it doesn not let the form be submitted.
            // if (!name) {
            //     errors.name = 'Name is required.';
            // }
            // if (!email) {
            //     errors.email = 'Email is required.';
            // }
            // if (!password) {
            //     errors.password = 'Password is required.';
            // }
            if (password !== confirmPassword) {
                errors.confirmationPassword = ['Passwords do not match.'];
            }

            if (Object.keys(errors).length > 0) {
                return fail(400, {
                    ...formValues,
                    errors
                });
            }
        } catch (error) {
            return fail(500, {
                ...formValues,
                errors: { general: ['Server error during registration.'] }
            });
        }

        // TODO :Registration and sign-in successful
        throw redirect(303, '/');
    }
} satisfies Actions;
