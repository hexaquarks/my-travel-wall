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

<form method="POST" action="?/login">
    <div class="m-auto space-y-1 w-full max-w-lg items-center">
        <h1 class="text-2xl font-bold mb-8 mt-8">Sign In</h1>

        <!-- Email Field -->
        <div>
            <label for="email" class="block text-sm font-medium">Email</label>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email..."
                class="input w-full {errors.email ? 'input-error' : ''}"
                value={email}
                required
            />
            {#if errors.email}
                <p class="text-red-500 text-sm mt-1">{errors.email}</p>
            {/if}
        </div>

        <!-- Password Field -->
        <div>
            <label for="password" class="block text-sm font-medium"
                >Password</label
            >
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password..."
                class="input w-full {errors.password ? 'input-error' : ''}"
                required
            />
            {#if errors.password}
                <p class="text-red-500 text-sm mt-1">{errors.password}</p>
            {/if}
        </div>

        <!-- General Error -->
        {#if errors.general}
            <div class="alert alert-error mt-4">{errors.general}</div>
        {/if}

        <!-- Submit Button -->
        <div class="pt-5">
            <button type="submit" class="btn variant-filled-surface">
                Sign In
            </button>
            <p class="mt-2 text-sm">
                Don't have an account?
                <a href="/?register" class="text-blue-600 hover:underline"
                    >Sign Up</a
                >
            </p>
        </div>
    </div>
</form>
