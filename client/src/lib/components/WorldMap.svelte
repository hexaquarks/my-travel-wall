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

    export let parentWidth, parentHeight;

    const path = geoPath();
    const ratios = new Map();

    let projection;
    let deps: any = [];
    let meshWorld: any;

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

        // TODO: Lots of magic constants, I'll let it pass for now.
        projection = geoNaturalEarth1()
            .scale(150)
            .translate([tx - 50, ty - 50])
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
                    class="country"
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
        fill: #6b7280;
        stroke: #111827;
        line-height: 10;
        transition: fill 0.3s ease;
    }

    /* Hovered country color */
    .country:hover {
        fill: #1e90ff !important;
    }

    /* Visited country color */
    .country.visited {
        fill: #00c853 !important;
    }
</style>
