<script>
    let showModal = false;
    let selectedCountry = "";
    let countries = ["USA", "Canada", "Germany", "Australia"]; // Add your country list here
    let cards = [];

    function addCard() {
        if (selectedCountry) {
            cards = [...cards, selectedCountry];
            closeModal();
        }
    }

    function closeModal() {
        selectedCountry = "";
        showModal = false;
    }

    function openModal() {
        showModal = true;
    }
</script>

<!-- Card component -->
<div class="card-container">
    {#each cards as card (card)}
        <div class="card">
            <p>{card}</p>
        </div>
    {/each}
    <button on:click={openModal}>+</button>
</div>

<!-- Modal for selecting a country -->
{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <h3>Select a Country</h3>
            <select bind:value={selectedCountry}>
                <option value="" disabled>Select a country</option>
                {#each countries as country}
                    <option value={country}>{country}</option>
                {/each}
            </select>

            <div class="modal-buttons">
                <button on:click={closeModal}>Close</button>
                <button on:click={addCard}>OK</button>
            </div>
        </div>
    </div>
{/if}

<!-- Styling -->
<style>
    .card-container {
        display: flex;
        flex-wrap: wrap;
    }

    .card {
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 300px;
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

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
