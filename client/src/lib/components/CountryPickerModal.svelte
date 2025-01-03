<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { defaultCountryCard, formatDate } from "$lib/util/util";
    import ImagePreviewCarousel from "./ImagePreviewCarousel.svelte";
    import type { CountryCardType } from "$lib/types/types";

    const modalStore = getModalStore();

    export let modalInitialData: CountryCardType = defaultCountryCard;
    export let modalCountriesList: Array<{ name: string }> = [];

    let countries = modalCountriesList;
    let selectedCountry = modalInitialData.country;
    let selectedStartDate = formatDate(modalInitialData.startDate);
    let selectedEndDate = formatDate(modalInitialData.endDate);
    let pictures = modalInitialData.pictures ?? [];
    let description = modalInitialData.description ?? "";
    let countryError = false;

    let fileInput: HTMLInputElement;

    let isPreviewOpen = false;
    let previewIndex = 0;

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") confirmSelection();
        if (e.key === "Escape") closeModal();
    };

    const handleCountryChange = (e: Event) => {
        selectedCountry = (e.target as HTMLSelectElement).value;
        countryError = false;
    };

    const handleAddPictures = (e: Event) => {
        const input = e.target as HTMLInputElement;
        if (!input.files) return;
        const newUrls = Array.from(input.files).map((f) =>
            URL.createObjectURL(f),
        );
        pictures = [...pictures, ...newUrls];
        input.value = "";
    };

    const pickFiles = () => {
        fileInput.click();
    };

    const removeImage = (i: number) => {
        pictures.splice(i, 1);
        pictures = [...pictures];
    };

    const openPreview = (i: number) => {
        previewIndex = i;
        isPreviewOpen = true;
    };

    const closePreview = () => {
        isPreviewOpen = false;
    };

    const closeModal = () => {
        modalStore.close();
    };

    const confirmSelection = () => {
        if (!selectedCountry) {
            countryError = true;
            return;
        }
        if ($modalStore[0]?.response) {
            $modalStore[0].response({
                country: selectedCountry,
                startDate: selectedStartDate || null,
                endDate: selectedEndDate || null,
                pictures,
                description,
            });
        }
        modalStore.close();
    };

    const cBase = "card p-6 w-modal shadow-xl space-y-6";
    const cHeader = "text-2xl font-bold";
    const cFooter = "flex justify-end space-x-2";
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>
            {$modalStore[0].title ?? "Add Trip Experience"}
        </header>
        <div class="space-y-4">
            <div>
                <label for="country" class="block text-sm font-medium">
                    Country <span class="text-red-500">*</span>
                </label>
                <select
                    id="country"
                    class="select w-full mt-1 {countryError
                        ? 'input-error'
                        : ''} variant-form-material"
                    bind:value={selectedCountry}
                    on:change={handleCountryChange}
                    required
                >
                    {#if countries.length === 0}
                        <option>Loading countries...</option>
                    {:else}
                        <option value="" disabled selected
                            >Select a country</option
                        >
                        {#each countries as c}
                            <option value={c.name}>{c.name}</option>
                        {/each}
                    {/if}
                </select>
                {#if countryError}
                    <p class="text-red-500 text-sm mt-1">
                        Please select a country.
                    </p>
                {/if}
            </div>

            <div class="flex space-x-4">
                <div class="flex-1">
                    <label for="start-date" class="block text-sm font-medium">
                        Start Date <span class="text-gray-500">(optional)</span>
                    </label>
                    <input
                        id="start-date"
                        type="date"
                        class="input w-full mt-1 variant-form-material"
                        bind:value={selectedStartDate}
                    />
                </div>
                <div class="flex-1">
                    <label for="end-date" class="block text-sm font-medium">
                        End Date <span class="text-gray-500">(optional)</span>
                    </label>
                    <input
                        id="end-date"
                        type="date"
                        class="input w-full mt-1 variant-form-material"
                        bind:value={selectedEndDate}
                    />
                </div>
            </div>

            <!-- Add Pictures -->
            <div>
                <label for="add-file" class="block text-sm font-medium">
                    Pictures <span class="text-gray-500">(optional)</span>
                </label>
                <button
                    type="button"
                    class="btn variant-filled-primary mt-1"
                    on:click={pickFiles}
                >
                    Add pictures...
                </button>
                <input
                    id="add-file"
                    type="file"
                    accept="image/*"
                    multiple
                    bind:this={fileInput}
                    class="hidden"
                    on:change={handleAddPictures}
                />
            </div>

            <!-- Thumbnails -->
            {#if pictures.length > 0}
                <div>
                    <h3 class="text-lg font-semibold">Selected Images</h3>
                    <div
                        class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4"
                    >
                        {#each pictures as pic, i (i)}
                            <div
                                class="snap-center shrink-0 w-40 h-40 border border-gray-300 rounded relative group"
                            >
                                <button
                                    type="button"
                                    class="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hidden group-hover:block"
                                    on:click|stopPropagation={() =>
                                        removeImage(i)}
                                    aria-label="Remove image"
                                >
                                    X
                                </button>
                                <button
                                    type="button"
                                    class="w-full h-full p-0 bg-transparent"
                                    on:click={() => openPreview(i)}
                                >
                                    <img
                                        class="w-full h-full object-cover rounded"
                                        src={pic}
                                        alt=""
                                    />
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}

            <div>
                <label for="description" class="block text-sm font-medium">
                    Description <span class="text-gray-500">(optional)</span>
                </label>
                <textarea
                    id="description"
                    class="textarea w-full mt-1 variant-form-material"
                    rows="2"
                    bind:value={description}
                ></textarea>
            </div>
        </div>
        <footer class={cFooter}>
            <button
                type="button"
                class="btn variant-filled-surface"
                on:click={closeModal}
            >
                Close
            </button>
            <button
                type="button"
                class="btn variant-filled-primary"
                on:click={confirmSelection}
            >
                OK
            </button>
        </footer>
    </div>

    <ImagePreviewCarousel
        isOpen={isPreviewOpen}
        {pictures}
        startIndex={previewIndex}
        onClose={closePreview}
    />
{/if}
