<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    // @ts-ignore
    let name = data.name || "";
    // @ts-ignore
    let email = data.email || "";
    let password = "";
    let confirm_password = "";

    // Extract errors from the form data
    // @ts-ignore /
    const errors = data.errors || {};
</script>

<form method="post" action="?/register" class="max-w-lg mx-auto mt-8 space-y-6">
    <h1 class="text-2xl font-bold">sign up</h1>

    <!-- name field -->
    <div>
        <label for="name" class="block text-sm font-medium">Name</label>
        <input
            id="name"
            name="name"
            type="text"
            class="mt-1 input w-full {errors.name ? 'input-error' : ''}"
            value={name}
            required
        />
        {#if errors.name}
            <p class="text-red-500 text-sm mt-1">{errors.name}</p>
        {/if}
    </div>

    <!-- Email Field -->
    <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
            id="email"
            name="email"
            type="email"
            class="mt-1 input w-full {errors.email ? 'input-error' : ''}"
            value={email}
            required
        />
        {#if errors.email}
            <p class="text-red-500 text-sm mt-1">{errors.email}</p>
        {/if}
    </div>

    <!-- Password Field -->
    <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input
            id="password"
            name="password"
            type="password"
            class="mt-1 input w-full {errors.password ? 'input-error' : ''}"
            required
        />
        {#if errors.password}
            <p class="text-red-500 text-sm mt-1">{errors.password}</p>
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
            class="mt-1 input w-full {errors.confirm_password
                ? 'input-error'
                : ''}"
            required
        />
        {#if errors.confirm_password}
            <p class="text-red-500 text-sm mt-1">
                {errors.confirm_password}
            </p>
        {/if}
    </div>

    <!-- General Error -->
    {#if errors.general}
        <div class="alert alert-error mt-4">{errors.general}</div>
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
