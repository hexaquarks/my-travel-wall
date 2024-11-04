<script lang="ts">
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import { getModalStore } from "@skeletonlabs/skeleton";
    import {
        PlusOutline,
        MinusOutline,
        ChevronDownOutline,
        ChevronUpOutline,
        CalendarMonthOutline,
        ClockOutline,
        FileLinesOutline,
        EditOutline,
    } from "flowbite-svelte-icons";
    import { slide } from "svelte/transition";
    import type { CountryCardFormData } from "$lib/types/types";
    import CountryPickerModal from "$lib/components/CountryPickerModal.svelte";

    enum CountryPickerMode {
        Edit,
        Create,
    }
    export let key: string = "";
    export let isPlaceholder: boolean;
    export let onOpenCountryPicker: (
        mode: CountryPickerMode,
        id?: string,
    ) => void;
    export let onDeleteCard: (id: string) => void;
    export let cardData: CountryCardFormData = { country: "" };

    // Temporary for testing, of course
    cardData.pictures = Array(5).fill(
        "https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg",
    );
    cardData.pictures = [];
    let isExpanded = false;

    const modalStore = getModalStore();
    const openConfirmationModal = (id: string) => {
        const deleteCardConfirmationModal: ModalSettings = {
            type: "confirm",
            title: "Please Confirm",
            body: "Are you sure you want to delete this trip report?",
            response: (res: boolean) => {
                if (res) {
                    onDeleteCard(id);
                    // TODO: Invoke a wall sync?
                }
            },
        };
        modalStore.trigger(deleteCardConfirmationModal);
    };

    const toggleExpand = () => {
        isExpanded = !isExpanded;
    };

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };

    const isCardExpandable = (): boolean => {
        return (
            cardData.pictures?.length !== 0 ||
            cardData.description?.length !== 0
        );
    };
</script>

{#if isPlaceholder}
    <!-- Placeholder Card -->
    <div
        class="card p-6 w-3/5 max-w-[600px] h-fit flex flex-col items-center border border-dashed border-gray-500"
    >
        <p
            class="mb-4 font-normal text-gray-700 dark:text-gray-400 leading-tight"
        >
            Add a country
        </p>
        <button
            type="button"
            class="btn-icon variant-filled-surface"
            on:click={() => onOpenCountryPicker(CountryPickerMode.Create)}
        >
            <PlusOutline />
        </button>
    </div>
{:else}
    <!-- Country Card with Data -->
    <div class="card p-6 w-3/5 max-w-[600px] h-fit shadow-lg rounded-lg">
        <div
            class="flex justify-between items-center pb-2 mb-4"
            class:border-b={isExpanded}
        >
            <div>
                <!-- Country Name -->
                <h2 class="text-2xl font-bold">{cardData.country}</h2>
                <!-- Date Range -->
                {#if cardData.startDate || cardData.endDate}
                    <p class="text-sm text-gray-400 flex items-center gap-2">
                        <CalendarMonthOutline class="inline w-4 h-4" />
                        <span>{formatDate(cardData.startDate)}</span>
                        {cardData.endDate
                            ? ` ⟶ ${formatDate(cardData.endDate)}`
                            : ""}
                    </p>
                {/if}
            </div>
            <!-- Side Buttons -->
            <div class="flex items-center space-x-2">
                <button
                    type="button"
                    class="btn-icon variant-filled-surface"
                    on:click={() =>
                        onOpenCountryPicker(CountryPickerMode.Edit, key)}
                >
                    <EditOutline />
                </button>
                <button
                    type="button"
                    class="btn-icon variant-filled-surface"
                    on:click={() => openConfirmationModal(key)}
                >
                    <MinusOutline />
                </button>
                {#if isCardExpandable()}
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
                {/if}
            </div>
        </div>
        {#if isExpanded}
            <div
                transition:slide={{ delay: 0, duration: 250 }}
                class="space-y-4"
            >
                <!-- Picture Carousel -->
                {#if cardData.pictures && cardData.pictures.length > 0}
                    <div>
                        <h3
                            class="text-lg font-semibold flex items-center gap-2"
                        >
                            <ClockOutline class="w-5 h-5" />Memories
                        </h3>
                        <div
                            class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-4"
                        >
                            {#each cardData.pictures as picture, i (i)}
                                <div
                                    class="snap-center shrink-0 card w-40 md:w-80 text-center"
                                >
                                    <img
                                        class="snap-center w-full h-full rounded-container-token"
                                        src={picture}
                                        alt={`trip picture ${i + 1}`}
                                        loading="lazy"
                                    />
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
                <!-- Description -->
                {#if cardData.description}
                    <div class="py-2 rounded-md">
                        <h3
                            class="text-lg font-semibold flex items-center gap-2"
                        >
                            <FileLinesOutline class="w-5 h-5" /> Trip Report
                        </h3>
                        <p class="text-gray-300">{cardData.description}</p>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
{/if}
