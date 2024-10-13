<script lang="ts">
    import { v4 as uuid } from "uuid";
    import CountryCard from "$lib/components/CountryCard.svelte";
    import { onMount } from "svelte";
    import { fetchCountries } from "$lib/util/CountrySelectionService.svelte";
    import {
        Modal,
        initializeStores,
        getModalStore,
    } from "@skeletonlabs/skeleton";
    import CountryPickerModal from "$lib/components/CountryPickerModal.svelte";
    import type { ModalSettings } from "@skeletonlabs/skeleton";

    initializeStores();
    const modalStore = getModalStore();

    let selectedCountry = "";
    let countries: Array<string> = [];

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
        country: string;
    };

    let countryCards: CountryCardType[] = [];

    const openModal = () => {
        const modalSettings: ModalSettings = {
            type: "component",
            title: "Showcase the country you visited!",
            component: {
                ref: CountryPickerModal,
                props: {
                    countries,
                    selectedCountry,
                    handleCountryChange,
                },
            },
            response: (selectedCountry: string) => {
                if (selectedCountry) {
                    addCard(selectedCountry);
                }
            },
        };
        modalStore.trigger(modalSettings);
    };

    const addCard = (country: string) => {
        const newCard: CountryCardType = { id: uuid(), country };
        countryCards = [...countryCards, newCard];
    };

    const deleteCard = (id: string) => {
        countryCards = countryCards.filter(
            (countryCard) => countryCard.id != id,
        );
    };
</script>

<div class="w-screen h-full mt-5 flex flex-col gap-5 items-center">
    <Modal />
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
</div>
