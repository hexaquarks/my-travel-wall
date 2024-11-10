<script lang="ts">
    import type { User } from "$lib/types/types";
    import { userStore } from "$lib/stores/userStore";
</script>

<h1>Welcome to SvelteKit</h1>
{#if $userStore}
    <h1>{$userStore.userName}</h1>
{:else}
    <p>Please log in to access your account.</p>
{/if}
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation.
</p>
