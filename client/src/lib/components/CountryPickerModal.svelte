<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { fetchCountries } from "$lib/util/CountrySelectionService.svelte";
    const modalStore = getModalStore();

    let countries: Array<string> = [];
    let selectedCountry: string = "";

    onMount(async () => {
        try {
            countries = await fetchCountries();
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    });

    const handleCountryChange = (event: any) => {
        selectedCountry = event.target.value;
    };

    const closeModal = () => {
        modalStore.close();
    };

    const confirmSelection = () => {
        if ($modalStore[0]?.response) {
            $modalStore[0].response(selectedCountry);
        }
        modalStore.close();
    };

    const cBase = "card p-4 w-modal shadow-xl space-y-4";
    const cHeader = "text-2xl font-bold";
    const cFooter = "flex justify-end space-x-2";
</script>

{#if $modalStore[0]}
    <div class={cBase}>
        <header class={cHeader}>
            {$modalStore[0].title ?? "Select a Country"}
        </header>
        <div class="space-y-4">
            <select
                class="select w-full"
                bind:value={selectedCountry}
                on:change={handleCountryChange}
            >
                {#if countries.length === 0}
                    <option>Loading countries...</option>
                {/if}
                {#each countries as country}
                    <option value={country}>{country}</option>
                {/each}
            </select>
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
