<script lang="ts">
    import { geoPath, geoMercator, geoNaturalEarth1 } from "d3-geo";
    import { scaleLinear } from "d3-scale";
    import { feature, mesh } from "topojson-client";
    import { onMount } from "svelte";

    let dimensions = {
        width: 700,
        height: 720,
        margin: {
            top: 24,
            right: 0,
            left: 0,
            bottom: 6,
        },
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
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",
        ).then((d) => d.json());

        // @ts-ignore
        deps = feature(world, world.objects.countries).features;

        meshWorld = mesh(world, world.objects.countries, (a, b) => a !== b);

        const containerWidth = parentWidth;
        const containerHeight = parentHeight;

        dimensions.width =
            containerWidth - dimensions.margin.left - dimensions.margin.right;
        dimensions.height =
            containerHeight - dimensions.margin.top - dimensions.margin.bottom;

        projection = geoNaturalEarth1()
            .scale(containerWidth / 5.5) // Adjust scale as needed
            .translate([containerWidth / 2, containerHeight / 2]);

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
                />
            {/each}
        </g>
    </svg>
</div>

<style>
    .world-map-container {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
