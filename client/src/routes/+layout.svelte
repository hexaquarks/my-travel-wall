<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import "../app.css";
    import type { PageData } from "./$types";

    type Temp = { user: string };
    export let data: PageData & Temp;
</script>

<Navbar user={data.user ?? ""} />
<slot />
