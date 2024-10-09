<script lang="ts">
    import { v4 as uuid } from "uuid";
    import CountryCard from "$lib/components/CountryCard.svelte";

    type CountryCardType = {
        id: string;
    };

    let countryCards: CountryCardType[] = [];

    const addCard = () => {
        const newCard: CountryCardType = { id: uuid() };
        countryCards = [...countryCards, newCard];
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
            onAddCard={addCard}
            onDeleteCard={deleteCard}
        />
    {/each}
    <CountryCard
        isPlaceholder={true}
        onAddCard={addCard}
        onDeleteCard={deleteCard}
    />
</div>
