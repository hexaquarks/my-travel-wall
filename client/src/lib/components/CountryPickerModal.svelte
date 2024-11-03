<script lang="ts">
    import type {
        CountryCardFormData,
        CountryCardType,
    } from "$lib/types/types";
    import { getModalStore } from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();

    export let modalInitialData: CountryCardType = {
        id: "",
        country: "",
        startDate: "",
        endDate: "",
        pictures: [],
        description: "",
    };

    export let modalCountriesList: Array<{ name: string }> = [];

    let countries: Array<{ name: string }> = modalCountriesList;
    let selectedCountry: string = modalInitialData.country;
    let selectedStartDate: string = formatDateString(
        modalInitialData.endDate ?? "",
    );
    let selectedEndDate: string = formatDateString(
        modalInitialData.endDate ?? "",
    );
    let pictures: Array<File | string> = modalInitialData.pictures ?? [];
    let description: string = modalInitialData.description ?? "";

    let countryError: boolean = false;

    function formatDateString(dateString: string | undefined): string {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        return date.toISOString().split("T")[0]; // Returns date in 'YYYY-MM-DD' format
    }

    const handleCountryChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        selectedCountry = target.value;
        countryError = false;
    };

    const handleStartDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        selectedStartDate = target.value;
    };

    const handleEndDateChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        selectedEndDate = target.value;
    };

    const handlePicturesChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            pictures = Array.from(target.files);
        }
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
            var startDateFormatted = formatDateString(selectedStartDate);
            var endDateFormatted = formatDateString(selectedEndDate);

            $modalStore[0].response({
                country: selectedCountry,
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                pictures: pictures,
                description: description,
            });
        }
        modalStore.close();
    };

    const cBase = "card p-6 w-modal shadow-xl space-y-6";
    const cHeader = "text-2xl font-bold";
    const cFooter = "flex justify-end space-x-2";
</script>

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>
            {$modalStore[0].title ?? "Add Trip Experience"}
        </header>
        <div class="space-y-4">
            <!-- Country Selection (Required) -->
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
                        {#each countries as country}
                            <option value={country.name}>{country.name}</option>
                        {/each}
                    {/if}
                </select>
                {#if countryError}
                    <p class="text-red-500 text-sm mt-1">
                        Please select a country.
                    </p>
                {/if}
            </div>

            <!-- Date Selection (Optional) -->
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
                        on:change={handleStartDateChange}
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
                        on:change={handleEndDateChange}
                    />
                </div>
            </div>

            <!-- Pictures Upload (Optional) -->
            <div>
                <label for="pictures" class="block text-sm font-medium">
                    Pictures <span class="text-gray-500">(optional)</span>
                </label>
                <div class="mt-1">
                    <input
                        id="pictures"
                        type="file"
                        class="file-input w-full pl-5 variant-form-material"
                        multiple
                        on:change={handlePicturesChange}
                    />
                </div>
            </div>

            <!-- Description (Optional) -->
            <div>
                <label for="description" class="block text-sm font-medium">
                    Description <span class="text-gray-500">(optional)</span>
                </label>
                <textarea
                    id="description"
                    class="textarea w-full mt-1 variant-form-material"
                    rows="2"
                    bind:value={description}
                    placeholder="Share your experiences from this trip..."
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
{/if}
