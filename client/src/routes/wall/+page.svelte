<script lang="ts">
    import { v4 as uuid } from "uuid";
    import CountryCard from "$lib/components/CountryCard.svelte";
    import {
        Modal,
        getModalStore,
        initializeStores,
    } from "@skeletonlabs/skeleton";
    import CountryPickerModal from "$lib/components/CountryPickerModal.svelte";
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import type { PageData } from "../$types";
    import type {
        CountryCardType,
        CountryCardFormData,
    } from "$lib/types/types";

    export let data: PageData;

    initializeStores();
    const modalStore = getModalStore();

    // @ts-ignore
    let countryCards: CountryCardType[] = data.countryCards ?? [];

    const openModal = () => {
        const modalSettings: ModalSettings = {
            type: "component",
            title: "Showcase the country you visited!",
            component: {
                ref: CountryPickerModal,
                props: {
                    // @ts-ignore
                    countries: data.countryListAPIResponse,
                },
            },
            response: (countryPickerData: CountryCardFormData) => {
                if (countryPickerData) {
                    addCard(countryPickerData);
                }
            },
        };
        modalStore.trigger(modalSettings);
    };

    const addCard = (formData: CountryCardFormData) => {
        const newCard: CountryCardType = { id: uuid(), ...formData };
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
            cardData={card}
        />
    {/each}
    <CountryCard
        isPlaceholder={true}
        onOpenCountryPicker={openModal}
        onDeleteCard={deleteCard}
    />
</div>
