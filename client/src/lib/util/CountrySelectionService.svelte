<script context="module" lang="ts">
    let countriesCache: Array<String> = [];
    let API_KEY: string = "";

    export async function fetchCountries() {
        if (countriesCache.length > 0) {
            return countriesCache;
        }

        // If not cached, fetch from the API
        const response = await fetch(
            "https://api.countrystatecity.in/v1/countries",
            {
                headers: {
                    "X-CSCAPI-KEY": API_KEY,
                },
            },
        );

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        const countries = await response.json();
        countriesCache = countries; // Cache the data
        console.log(countriesCache);
        return countries;
    }
</script>
