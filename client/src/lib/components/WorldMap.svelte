<script lang="ts">
    import { geoPath, geoNaturalEarth1 } from "d3-geo";
    import { scaleLinear } from "d3-scale";
    import { feature, mesh } from "topojson-client";
    import { onMount } from "svelte";
    import { WORLD_MAP_ANTARTICA_SIZE_TO_CUT } from "$lib/util/util";

    let dimensions = {
        width: 700,
        height: 720,
    };

    export let parentWidth;
    export let parentHeight;
    export let visitedCountries: string[] = []; // Reactive prop from parent

    const path = geoPath();
    const ratios = new Map();

    let projection;
    let deps: any = [];
    let meshWorld: any;

    // Reactive set for quick lookup
    $: visitedCountrySet = new Set(visitedCountries);

    let scale = scaleLinear<string, string>()
        .domain([0, 1])
        .range(["#FFFFFF", "#FFFFFF"]);

    onMount(async () => {
        const world = await fetch(
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        ).then((d) => d.json());

        // @ts-ignore
        deps = feature(world, world.objects.countries).features;
        meshWorld = mesh(world, world.objects.countries, (a, b) => a !== b);

        dimensions.width = parentWidth;
        dimensions.height = parentHeight;

        const [tx, ty] = geoNaturalEarth1().translate();

        projection = geoNaturalEarth1()
            .scale(150)
            .translate([tx + 215, ty - 50])
            .center([0, 10])
            .clipExtent([
                [0, 0],
                [
                    dimensions.width,
                    dimensions.height - WORLD_MAP_ANTARTICA_SIZE_TO_CUT - 50,
                ],
            ]);

        path.projection(projection);
    });
</script>

<div class="world-map-container">
    <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    >
        <g>
            <path
                fill="none"
                stroke="white"
                stroke-linejoin="round"
                d={path(meshWorld)}
            />
            {#each deps as feature}
                <path
                    fill={scale(ratios.get(feature.properties.name))}
                    d={path(feature)}
                    class="country {visitedCountrySet.has(
                        feature.properties.name,
                    )
                        ? 'visited'
                        : ''}"
                />
            {/each}
        </g>
    </svg>
</div>

<style>
    .world-map-container {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Default country color */
    .country {
        fill: #4a4a4a;
        stroke: #333333;
        transition: fill 0.3s ease;
    }

    /* Hovered country color */
    .country:hover {
        fill: #87869c !important;
    }

    /* Visited country color */
    .country.visited {
        fill: #1e90ff !important;
    }
</style>
