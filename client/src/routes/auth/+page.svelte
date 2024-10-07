<script>
    import { page } from "$app/stores";
    import { Button } from "flowbite-svelte";
    import { Input, Label } from "flowbite-svelte";
    // import { get } from "svelte/store";
    // $: Note: reactive declaration this will make the component rerender if it changes.
    $: mode = $page.url.searchParams.get("mode") || "signin";
</script>

{#if mode === "signin"}
    <h1 class="text-2xl font-bold mb-4">Sign In</h1>
    <form class="space-y-4">
        <div>
            <Label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Email</Label
            >
            <Input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
            />
        </div>
        <div>
            <Label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</Label
            >
            <Input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
            />
        </div>
        <Button type="submit">Sign In</Button>
    </form>
    <p class="mt-4 text-sm">
        Don't have an account? <a
            href="/auth?mode=signup"
            class="text-blue-600 hover:underline">Sign Up</a
        >
    </p>
{/if}

{#if mode === "signup"}
    <h1 class="text-2xl font-bold mb-4">Sign Up</h1>
    <form class="space-y-4">
        <div>
            <Label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Email</Label
            >
            <Input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
            />
        </div>
        <div>
            <Label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</Label
            >
            <Input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
            />
        </div>
        <div>
            <Label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Confirm Password</Label
            >
            <Input
                id="confirm-password"
                type="password"
                required
                placeholder="Confirm your password"
            />
        </div>
        <Button type="submit">Sign Up</Button>
    </form>
    <p class="mt-4 text-sm">
        Already have an account? <a
            href="/auth?mode=signin"
            class="text-blue-600 hover:underline">Sign In</a
        >
    </p>
{/if}
