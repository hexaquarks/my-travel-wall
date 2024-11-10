<script lang="ts">
    import "../app.css";
    import type { PageData } from "./$types";
    import Navbar from "$lib/components/Navbar.svelte";
    import { userStore } from "$lib/stores/userStore";

    export let data: PageData;

    // Update the user store with the data from the server
    $: if (data.user !== undefined) {
        userStore.set(data.user);
    }
</script>

<Navbar />

<slot />
