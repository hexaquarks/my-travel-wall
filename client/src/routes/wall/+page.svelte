<script lang="ts">
    import { v4 as uuid } from "uuid";
    import CountryCard from "$lib/components/CountryCard.svelte";
    import { Card, Button } from "flowbite-svelte";
    import { fade, scale, slide } from "svelte/transition";
    import { onMount } from "svelte";
    import { fetchCountries } from "$lib/util/CountrySelectionService.svelte";

    let showModal = true;
    let selectedCountry = "";
    let countries: Array<String> = [];

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

    type CountryCardType = {
        id: string;
    };

    let countryCards: CountryCardType[] = [];

    // Open and close modal
    const openModal = () => {
        showModal = true;
    };

    const closeModal = () => {
        selectedCountry = "";
        showModal = false;
    };

    const addCard = () => {
        const newCard: CountryCardType = { id: uuid() };
        countryCards = [...countryCards, newCard];
        closeModal();
    };

    const deleteCard = (id: string) => {
        countryCards = countryCards.filter(
            (countryCard) => countryCard.id != id,
        );
    };
</script>

<div class="w-screen h-full mt-5 flex flex-col gap-5 items-center">
    {#each countryCards as card (card.id)}
        <CountryCard
            key={card.id}
            isPlaceholder={false}
            onOpenCountryPicker={openModal}
            onDeleteCard={deleteCard}
        />
    {/each}
    <CountryCard
        isPlaceholder={true}
        onOpenCountryPicker={openModal}
        onDeleteCard={deleteCard}
    />

    <!-- Modal for selecting a country -->
    {#if showModal}
        <div transition:fade={{ delay: 0, duration: 75 }}>
            <Card
                size="xl"
                class="w-7/12 max-w-[700px] h-screen max-h-[600px] border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <div
                    class="h-full flex flex-col items-center justify-around"
                    transition:fade={{ delay: 0, duration: 2000 }}
                >
                    <h2>Showcase the country you visited!</h2>
                    <select
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

                    <div class="modal-buttons">
                        <Button class="w-fit" on:click={closeModal}>
                            <div class="w-6 h-6 ms-2 text-white">Close</div>
                        </Button>
                        <Button class="w-fit" on:click={addCard}>
                            <div class="w-6 h-6 ms-2 text-white">OK</div>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    {/if}
</div>

<style>
    .modal-buttons {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    select {
        margin: 10px 0;
        width: 100%;
    }
</style>
