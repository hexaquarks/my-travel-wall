<script lang="ts">
    import { PlusOutline, MinusOutline } from "flowbite-svelte-icons";

    export let key: string = "";
    export let isPlaceholder: boolean;
    export let onOpenCountryPicker: () => void;
    export let onDeleteCard: (id: string) => void;
</script>

{#if isPlaceholder}
    <div class="card p-6 w-3/5 max-w-[600px] h-fit flex flex-col items-center">
        <p
            class="mb-4 font-normal text-gray-700 dark:text-gray-400 leading-tight"
        >
            Add a country
        </p>
        <button
            type="button"
            class="btn-icon variant-filled-surface"
            on:click={onOpenCountryPicker}
        >
            <PlusOutline class="" />
        </button>
    </div>
{:else}
    <div class="card p-6 w-3/5 max-w-[600px] h-fit flex flex-col items-center">
        <p
            class="mb-4 font-normal text-gray-700 dark:text-gray-400 leading-tight"
        >
            {key}
        </p>
        <button
            type="button"
            class="btn-icon variant-filled-surface"
            on:click={() => onDeleteCard(key)}
        >
            <MinusOutline class="" />
        </button>
    </div>
{/if}
