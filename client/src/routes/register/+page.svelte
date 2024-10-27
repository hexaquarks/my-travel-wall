<script lang="ts">
    import type { RegistrationFormFields } from "$lib/types/types.ts";
    import type { ActionData } from "./$types";

    export let form: ActionData & RegistrationFormFields;
</script>

<form method="POST" class="max-w-lg mx-auto mt-8 space-y-6">
    <h1 class="text-2xl font-bold">sign up</h1>

    <!-- name field -->
    <div>
        <label for="name" class="block text-sm font-medium">Name</label>
        <input
            id="name"
            name="name"
            type="text"
            class="mt-1 input w-full {form?.errors?.name ? 'input-error' : ''}"
            value={form?.name ?? ""}
            required
        />
        {#if form?.errors?.name}
            <p class="text-red-500 text-sm mt-1">{form?.errors?.name ?? ""}</p>
        {/if}
    </div>

    <!-- Email Field -->
    <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
            id="email"
            name="email"
            type="email"
            class="mt-1 input w-full {form?.errors?.email ? 'input-error' : ''}"
            value={form?.email ?? ""}
            required
        />
        {#if form?.errors?.email}
            <div>
                {#each form?.errors?.email as err}
                    <p class="text-red-500 text-sm mt-1">
                        {err ?? ""}
                    </p>
                {/each}
            </div>
        {/if}
    </div>

    <!-- Password Field -->
    <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
            id="password"
            name="password"
            type="password"
            class="mt-1 input w-full {form?.errors?.password
                ? 'input-error'
                : ''}"
            required
        />
        {#if form?.errors?.password}
            <div>
                {#each form?.errors?.password as err}
                    <p class="text-red-500 text-sm mt-1">
                        {err ?? ""}
                    </p>
                {/each}
            </div>
        {/if}
    </div>

    <!-- Confirm Password Field -->
    <div>
        <label for="confirm_password" class="block text-sm font-medium"
            >Confirm Password</label
        >
        <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            class="mt-1 input w-full {form?.errors?.confirmationPassword
                ? 'input-error'
                : ''}"
            required
        />
        {#if form?.errors?.confirmationPassword}
            <div>
                {#each form?.errors?.confirmationPassword as err}
                    <p class="text-red-500 text-sm mt-1">
                        {err ?? ""}
                    </p>
                {/each}
            </div>
        {/if}
    </div>

    <!-- General Error -->
    {#if form?.errors?.general}
        <div>
            {#each form?.errors?.general as err}
                <div class="alert alert-error mt-4">{err ?? ""}</div>
            {/each}
        </div>
    {/if}

    <!-- Submit Button -->
    <div>
        <button type="submit" class="btn variant-filled-primary w-full">
            Sign Up
        </button>
        <p class="mt-2 text-sm text-center">
            Already have an account?
            <a href="?/login" class="text-blue-600 hover:underline">Sign In</a>
        </p>
    </div>
</form>
