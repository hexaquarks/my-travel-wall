import { v4 as uuid } from 'uuid';
import { writable, type Writable, get } from 'svelte/store';

import type {
    CountryCardType,
    CountryCardFormData,
    WallMetaInfo,
} from '$lib/types/types';

export default class WallManager {
    countryCards: Writable<CountryCardType[]>;
    wallMetaInfo: Writable<WallMetaInfo>;

    constructor(initialCards: CountryCardType[], initialMeta: WallMetaInfo) {
        this.countryCards = writable(initialCards);
        this.wallMetaInfo = writable(initialMeta);
    }

    addCard = (formData: CountryCardFormData) => {
        const newCard: CountryCardType = { id: uuid(), ...formData };
        this.countryCards.update((cards) => [...cards, newCard]);
    }

    editCard = (updatedCard: CountryCardType) => {
        this.countryCards.update((cards) =>
            cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
        );
        this.updateWallCard(updatedCard);
    }

    deleteCard = (id: string) => {
        this.countryCards.update((cards) =>
            cards.filter((card) => card.id !== id)
        );
    }

    getCard = (id: string): CountryCardType | undefined => {
        const cards = get(this.countryCards);
        return cards.find((c) => c.id === id);
    }

    getCards = (): CountryCardType[] => {
        return get(this.countryCards);
    }

    saveWall = async () => {
        const cards = get(this.countryCards);
        const meta = get(this.wallMetaInfo);

        try {
            await fetch(
                '/api/wall',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        wallMetaInfo: meta,
                        countryCards: cards
                    })
                });
            alert('Wall saved successfully.');
        } catch (error) {
            console.error(`Error saving wall: ${error}`);
            alert('Failed to save wall.');
        }
    }

    updateWallCard = async (cardData: CountryCardType) => {
        try {
            await fetch(
                '/api/countryCard',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cardData)
                });

            alert('Country card updated successfully.');
        } catch (error) {
            console.error(`Error updating country card: ${error}`);
            alert('Failed to update country card.');
        }
    }
}
