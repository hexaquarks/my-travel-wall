import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { LoginFormFields, LoginFormErrors } from "$lib/types/types.js";

// Contract established on the backend server.
type ErrorField = "password" | "email" | "general";
type BackendErrorStructure = { field: ErrorField; message: string }[];

function populateErrorMessagesRecievedFromBackend(
    errorData: BackendErrorStructure,
    errors: LoginFormErrors) {
    errorData.forEach((error) => {
        switch (error.field) {
            case "email":
                (errors.email ??= []).push(error.message);
                break;
            case "password":
                (errors.password ??= []).push(error.message);
                break;
            case "general":
                (errors.general ??= []).push(error.message)
            default:
                break;
        }
    });
}

export const actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';

        // The formValues that can have an error and might be brought
        // back to the user.
        const formValues = { email, password };

        const errors: LoginFormErrors = {};

        try {
            const response = await fetch('http://localhost:5072/account/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();

                populateErrorMessagesRecievedFromBackend(errorData, errors);

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

            // TODO :Registration and sign-in successful
            throw redirect(303, '/');
        } catch (error) {
            return fail(500, {
                ...formValues,
                errors: { general: ['Server error during registration.'] }
            });
        }
    }
} satisfies Actions;
