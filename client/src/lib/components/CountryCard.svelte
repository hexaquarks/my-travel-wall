<script lang="ts">
    import { Card, Button } from "flowbite-svelte";
    import { PlusOutline, MinusOutline } from "flowbite-svelte-icons";

    export let key: string = "";
    export let isPlaceholder: boolean;
    export let onAddCard: () => void;
    export let onDeleteCard: (id: string) => void;
</script>

{#if isPlaceholder}
    <Card size="md" class="items-center">
        <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight"
        >
            Add a country
        </p>
        <Button class="w-fit" on:click={onAddCard}>
            <PlusOutline class="w-6 h-6 ms-2 text-white" />
        </Button>
    </Card>
{:else}
    <Card size="md" class="items-center">
        <p>{key}</p>
        <Button class="w-fit" on:click={() => onDeleteCard(key)}>
            <MinusOutline class="w-6 h-6 ms-2 text-white" />
        </Button>
    </Card>
{/if}
