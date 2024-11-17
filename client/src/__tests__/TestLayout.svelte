<script lang="ts">
    import {
        initializeStores,
        getModalStore,
        Modal,
    } from "@skeletonlabs/skeleton";
    import type { SvelteComponentTyped } from "svelte";
    import { onMount } from "svelte";

    initializeStores();

    export let ComponentUnderTest: typeof SvelteComponentTyped<any>;
    export let componentProps: Record<string, any> = {};
</script>

<Modal />
<svelte:component this={ComponentUnderTest} {...componentProps} />
