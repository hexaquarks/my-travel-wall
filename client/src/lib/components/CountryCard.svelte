<script lang="ts">
    import {
        PlusOutline,
        MinusOutline,
        ChevronDownOutline,
        ChevronUpOutline,
    } from "flowbite-svelte-icons";
    import { slide } from "svelte/transition";
    import type { CountryCardFormData } from "$lib/types/types";

    export let key: string = "";
    export let isPlaceholder: boolean;
    export let onOpenCountryPicker: () => void;
    export let onDeleteCard: (id: string) => void;
    export let cardData: CountryCardFormData = { country: "" };

    let isExpanded = false;

    const toggleExpand = () => {
        isExpanded = !isExpanded;
    };

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };
</script>

{#if isPlaceholder}
    <!-- Placeholder Card -->
    <div class="card p-6 w-3/5 max-w-[600px] h-fit flex flex-col items-center">
        <p
            class="mb-4 font-normal text-gray-700 dark:text-gray-400 leading-tight"
        >
            Add a country
        </p>
        <button
            type="button"
            class="btn-icon variant-filled-surface"
            on:click={onOpenCountryPicker}
        >
            <PlusOutline />
        </button>
    </div>
{:else}
    <!-- Country Card with Data -->
    <div class="card p-6 w-3/5 max-w-[600px] h-fit">
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-xl font-semibold">{cardData.country}</h2>
                {#if cardData.startDate || cardData.endDate}
                    <p class="text-sm text-gray-500">
                        {formatDate(cardData.startDate)}
                        {cardData.endDate
                            ? `- ${formatDate(cardData.endDate)}`
                            : ""}
                    </p>
                {/if}
            </div>
            <div class="flex items-center space-x-2">
                <button
                    type="button"
                    class="btn-icon variant-filled-surface"
                    on:click={() => onDeleteCard(key)}
                >
                    <MinusOutline />
                </button>
                <button
                    type="button"
                    class="btn-icon variant-filled-surface"
                    on:click={toggleExpand}
                    aria-expanded={isExpanded}
                >
                    {#if isExpanded}
                        <ChevronUpOutline />
                    {:else}
                        <ChevronDownOutline />
                    {/if}
                </button>
            </div>
        </div>
        {#if isExpanded}
            <div
                transition:slide={{ delay: 0, duration: 250 }}
                class="mt-4 space-y-4"
            >
                {#if cardData.description}
                    <p class="text-gray-700">{cardData.description}</p>
                {/if}
                {#if cardData.pictures && cardData.pictures.length > 0}
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
                    >
                        {#each cardData.pictures as picture}
                            <img
                                src={URL.createObjectURL(picture)}
                                alt="Trip Picture"
                                class="w-full h-auto object-cover"
                                loading="lazy"
                            />
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{/if}
