<script lang="ts">
    import {
        initializeStores,
        getModalStore,
        Modal,
    } from "@skeletonlabs/skeleton";
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    initializeStores();

    export let modalSettings: ModalSettings;

    const modalStore = getModalStore();

    onMount(() => {
        modalStore.trigger(modalSettings);
    });
</script>

<Modal />
