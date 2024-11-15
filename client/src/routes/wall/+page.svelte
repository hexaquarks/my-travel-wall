<script lang="ts">
    import {
        Modal,
        getModalStore,
        initializeStores,
    } from "@skeletonlabs/skeleton";
    import { defaultCountryCard } from "$lib/util/util";

    import type { ModalSettings } from "@skeletonlabs/skeleton";
    import type { PageData } from "./$types";
    import type {
        CountryCardType,
        CountryCardFormData,
        WallServerLoadInfo,
    } from "$lib/types/types";

    import CountryPickerModal from "$lib/components/CountryPickerModal.svelte";
    import WallManager from "$lib/services/WallManager";
    import CountryCard from "$lib/components/CountryCard.svelte";
    import WorldMap from "$lib/components/WorldMap.svelte";

    export let data: PageData & WallServerLoadInfo;

    let w, h;

    enum CountryPickerMode {
        Edit,
        Create,
    }

    initializeStores();
    const modalStore = getModalStore();

    let countryListFromAPI: Array<{ name: string }> =
        data.countryNamesListFromAPI ?? [];

    const wallManager = new WallManager(
        data.wallInfo?.countryCards ?? [],
        data.wallInfo?.wallMetaInfo ?? {
            isPublic: false,
            createdAt: new Date().toISOString(),
        },
    );

    $: countryCards = wallManager.countryCards;

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
                        ? (wallManager.getCard(cardId ?? "") ??
                          defaultCountryCard)
                        : defaultCountryCard,
                },
            },
            response: (countryPickerData: CountryCardFormData) => {
                if (countryPickerData) {
                    if (isEditMode) {
                        wallManager.editCard({
                            id: cardId ?? "",
                            ...countryPickerData,
                        } as CountryCardType);
                    } else {
                        wallManager.addCard(countryPickerData);
                    }
                }
            },
        };
        modalStore.trigger(modalSettings);
    };

    // let colors = ["#ea4f19", "#b15222", "#75542a", "#3c5733", "#005739"];
</script>

<div
    class="w-screen h-full mt-5 flex flex-col gap-5 items-center"
    bind:clientWidth={w}
    bind:clientHeight={h}
>
    <Modal />

    <WorldMap parentWidth={(w * 3) / 5} parentHeight={(h * 3) / 5} />

    <!-- Save Wall Button -->
    <button
        class="btn variant-filled-primary mb-4"
        on:click|preventDefault={wallManager.saveWall}
    >
        Save Wall
    </button>

    {#each $countryCards as card (card.id)}
        <CountryCard
            key={card.id}
            isPlaceholder={false}
            onOpenCountryPicker={openCountryPickerModal}
            onDeleteCard={wallManager.deleteCard}
            cardData={card}
        />
    {/each}
    <CountryCard
        isPlaceholder={true}
        onOpenCountryPicker={openCountryPickerModal}
        onDeleteCard={wallManager.deleteCard}
    />
</div>
