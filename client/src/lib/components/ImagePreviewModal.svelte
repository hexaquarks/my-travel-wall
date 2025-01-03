<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import ImagePreviewCarousel from "./ImagePreviewCarousel.svelte";

    export let pictures: string[] = [];
    export let startIndex: number = 0;

    const modalStore = getModalStore();
    let currentIndex = startIndex;

    const closeModal = () => {
        modalStore.close();
    };
</script>

{#if $modalStore[0]}
    <ImagePreviewCarousel
        isOpen={true}
        {pictures}
        startIndex={currentIndex}
        onClose={closeModal}
    />
{/if}
