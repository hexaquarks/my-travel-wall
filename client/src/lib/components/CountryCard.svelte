<script>
    import { Card, Button } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";
</script>

<Card size="md" class="items-center">
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Add a country
    </p>
    <Button class="w-fit">
        <PlusOutline class="w-6 h-6 ms-2 text-white" />
    </Button>
</Card>
