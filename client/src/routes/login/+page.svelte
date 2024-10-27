<script lang="ts">
    import type { LoginFormFields } from "$lib/types/types.ts";
    import type { ActionData } from "./$types";

    export let form: ActionData & LoginFormFields;
</script>

<form method="post" action="?/login" class="max-w-lg mx-auto mt-8 space-y-6">
    <h1 class="text-2xl font-bold">sign in</h1>

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
            Sign In
        </button>
        <p class="mt-2 text-sm text-center">
            Don't have an account yet?
            <a href="?/register" class="text-blue-600 hover:underline"
                >Sign Up</a
            >
        </p>
    </div>
</form>
