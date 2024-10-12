<script>
    import { page } from "$app/stores";
    import { Input, Label } from "flowbite-svelte";
    // import { get } from "svelte/store";
    // $: Note: reactive declaration this will make the component rerender if it changes.
    $: mode = $page.url.searchParams.get("mode") || "signin";
</script>

{#if mode === "signin"}
    <div class="m-auto space-y-1 w-full max-w-lg items-center">
        <h1 class="text-2xl font-bold mb-8 mt-8">Sign In</h1>
        <p>email</p>
        <div class="input-group input-group-divider grid-cols-[1fr_auto]">
            <input type="text" placeholder="Enter your email..." />
        </div>
        <p class="pt-5">password</p>
        <div class="input-group input-group-divider grid-cols-[1fr_auto]">
            <input type="text" placeholder="Enter your password..." />
        </div>
        <div class="pt-5">
            <button type="button" class="btn variant-filled-surface"
                >Sign In</button
            >
            <p class="mt-2 text-sm">
                Don't have an account? <a
                    href="/auth?mode=signup"
                    class="text-blue-600 hover:underline">Sign Up</a
                >
            </p>
        </div>
    </div>
{/if}

{#if mode === "signup"}
    <div class="m-auto space-y-1 w-full max-w-lg items-center">
        <h1 class="text-2xl font-bold mb-8 mt-8">Sign Up</h1>
        <p>email</p>
        <div class="input-group input-group-divider grid-cols-[1fr_auto]">
            <input type="text" placeholder="Enter your email..." />
        </div>
        <p class="pt-5">password</p>
        <div class="input-group input-group-divider grid-cols-[1fr_auto]">
            <input type="text" placeholder="Enter your password..." />
        </div>
        <p class="pt-5">confirm password</p>
        <div class="input-group input-group-divider grid-cols-[1fr_auto]">
            <input type="text" placeholder="Confirm your password..." />
        </div>
        <div class="pt-5">
            <button type="button" class="btn variant-filled-surface"
                >Sign Up</button
            >
            <p class="mt-2 text-sm">
                Already have an account? <a
                    href="/auth?mode=signin"
                    class="text-blue-600 hover:underline">Sign Up</a
                >
            </p>
        </div>
    </div>
{/if}
