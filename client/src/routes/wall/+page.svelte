<script lang="ts">
    import { v4 as uuid } from "uuid";
    import CountryCard from "$lib/components/CountryCard.svelte";
    import {
        Modal,
        getModalStore,
        initializeStores,
    } from "@skeletonlabs/skeleton";
    import { defaultCountryCard } from "$lib/util/util";
    import CountryPickerModal from "$lib/components/CountryPickerModal.svelte";
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import type { PageData } from "./$types";
    import type {
        CountryCardType,
        CountryCardFormData,
        WallServerLoadInfo,
        WallType,
        WallMetaInfo,
    } from "$lib/types/types";

    export let data: PageData & WallServerLoadInfo;

    enum CountryPickerMode {
        Edit,
        Create,
    }

    initializeStores();
    const modalStore = getModalStore();

    let countryCards: Array<CountryCardType> =
        data.wallInfo?.countryCards ?? [];
    let wallMetaInfo: WallMetaInfo = data.wallInfo?.wallMetaInfo ?? {
        isPublic: false,
        createdAt: new Date().toISOString(),
    };
    let countryListFromAPI: Array<{ name: string }> =
        data.countryNamesListFromAPI ?? [];

    const openCountryPickerModal = (
        mode: CountryPickerMode,
        cardId?: string,
    ) => {
        var isEditMode: boolean = mode == CountryPickerMode.Edit;

        const modalSettings: ModalSettings = {
            type: "component",
            title: `${isEditMode ? `Edit` : `Create`} the country you visited!`,
            component: {
                ref: CountryPickerModal,
                props: {
                    modalCountriesList: countryListFromAPI,
                    modalInitialData: isEditMode
                        ? (getCard(cardId ?? "") ?? defaultCountryCard)
                        : defaultCountryCard,
                },
            },
            response: (countryPickerData: CountryCardFormData) => {
                if (countryPickerData) {
                    if (isEditMode) {
                        editCard({
                            id: cardId ?? "",
                            ...countryPickerData,
                        } as CountryCardType);
                    } else {
                        addCard(countryPickerData);
                    }
                }
            },
        };
        modalStore.trigger(modalSettings);
    };

    const addCard = (formData: CountryCardFormData) => {
        const newCard: CountryCardType = { id: uuid(), ...formData };
        countryCards = [...countryCards, newCard];
    };

    const editCard = (newCountryCard: CountryCardType) => {
        const index = countryCards.findIndex(
            (card) => card.id === newCountryCard.id,
        );

        if (index !== -1) {
            countryCards[index] = newCountryCard;
            updateCard(newCountryCard);
        }
    };

    const deleteCard = (id: string) => {
        countryCards = countryCards.filter(
            (countryCard) => countryCard.id !== id,
        );
    };

    const getCard = (id: string): CountryCardType | undefined => {
        return countryCards.find((countryCard) => countryCard.id == id);
    };

    // Function to save the wall using the API endpoint
    const saveWall = async () => {
        try {
            const response = await fetch("/api/wall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wallMetaInfo: wallMetaInfo,
                    countryCards: countryCards,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(
                    `Error saving wall: ${response.status} ${result.error}`,
                );
                alert("Failed to save wall.");
            } else {
                alert("Wall saved successfully.");
            }
        } catch (error) {
            console.error(`Error in saveWall: ${error}`);
            alert("An error occurred while saving the wall.");
        }
    };

    // Function to save the wall using the API endpoint
    const updateCard = async (countryCardEditionData: CountryCardFormData) => {
        try {
            const response = await fetch("/api/countryCard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(countryCardEditionData),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(
                    `Error updating country card: ${response.status} ${result.error}`,
                );
                alert("Failed to country card.");
            } else {
                alert("Country card updated successfully.");
            }
        } catch (error) {
            console.error(`Error in updateCard: ${error}`);
            alert("An error occurred while updating a country card.");
        }
    };
</script>

<div class="w-screen h-full mt-5 flex flex-col gap-5 items-center">
    <Modal />

    <!-- Save Wall Button -->
    <button
        class="btn variant-filled-primary mb-4"
        on:click|preventDefault={saveWall}
    >
        Save Wall
    </button>

    {#each countryCards as card (card.id)}
        <CountryCard
            key={card.id}
            isPlaceholder={false}
            onOpenCountryPicker={openCountryPickerModal}
            onDeleteCard={deleteCard}
            cardData={card}
        />
    {/each}
    <CountryCard
        isPlaceholder={true}
        onOpenCountryPicker={openCountryPickerModal}
        onDeleteCard={deleteCard}
    />
</div>
