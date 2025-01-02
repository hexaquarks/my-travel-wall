<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";

    export let pictures: string[] = [];
    export let startIndex: number = 0;

    const modalStore = getModalStore();
    let currentIndex = startIndex;

    const closeModal = () => {
        modalStore.close();
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % pictures.length;
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
    };
</script>

{#if $modalStore[0]}
    <div
        class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
        <div
            class="relative rounded-lg shadow-xl max-w-3xl w-full p-4 bg-gray-900 flex flex-col items-center"
        >
            <div class="w-full flex justify-end mb-2">
                <button class="btn-icon variant-filled" on:click={closeModal}>
                    ×
                </button>
            </div>

            <div class="flex items-center justify-center space-x-4">
                {#if pictures.length > 1}
                    <!-- Prev Button -->
                    <button
                        class="btn variant-ghost text-xl"
                        on:click={prevImage}
                    >
                        ‹
                    </button>
                {/if}

                <!-- The Image -->
                <img
                    src={pictures[currentIndex]}
                    alt="Preview"
                    class="max-w-full max-h-[80vh] object-contain rounded"
                />

                {#if pictures.length > 1}
                    <!-- Next Button -->
                    <button
                        class="btn variant-ghost text-xl"
                        on:click={nextImage}
                    >
                        ›
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}
