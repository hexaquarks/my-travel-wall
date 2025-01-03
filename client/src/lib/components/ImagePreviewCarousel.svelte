<script lang="ts">
    export let pictures: string[] = [];
    export let isOpen: boolean = false;
    export let startIndex: number = 0;
    export let onClose: () => void = () => {};

    let currentIndex = startIndex;

    const onKeyDown = (e: any) => {
        if (e.key == "ArrowLeft") {
            prevImage();
        } else if (e.key == "ArrowRight") {
            nextImage();
        }
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % pictures.length;
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
    };

    $: if (startIndex !== currentIndex && isOpen === false) {
        currentIndex = startIndex;
    }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

{#if isOpen}
    <div
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
        <div
            class="relative rounded-lg shadow-xl max-w-3xl w-full p-4 flex flex-col items-center"
        >
            <div class="w-full flex justify-end mb-6 ml-16">
                <button
                    class="btn-icon font-normal text-2xl variant-ghost"
                    on:click={onClose}
                >
                    ×
                </button>
            </div>

            <div class="flex items-center justify-center space-x-4">
                {#if pictures.length > 1}
                    <!-- Prev Button -->
                    <button
                        class="btn variant-ghost font-normal text-2xl"
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
                        class="btn variant-ghost font-normal text-2xl"
                        on:click={nextImage}
                    >
                        ›
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}
