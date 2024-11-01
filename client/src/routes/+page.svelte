<script lang="ts">
    import type { PageData } from "./$types";

    type Temp = { user: string };
    export let data: PageData & Temp;
    // }
</script>

<!-- <button on:click={() => authenticate()} /> -->

<h1>Welcome to SvelteKit</h1>
{#if data.user}
    <h1>{data.user.userName}</h1>
{/if}
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
