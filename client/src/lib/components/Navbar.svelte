<script lang="ts">
    import {
        Navbar,
        NavBrand,
        NavUl,
        NavHamburger,
        NavLi,
    } from "flowbite-svelte";
    import { LightSwitch } from "@skeletonlabs/skeleton";
    import { userStore } from "$lib/stores/userStore";
</script>

<slot>
    <Navbar>
        <NavBrand href="/">
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >
                MyTravelWall
            </span>
        </NavBrand>
        <NavHamburger />
        <NavUl>
            <LightSwitch />
            <NavLi href="/">Home</NavLi>
            <NavLi href="/wall">Wall</NavLi>
            {#if $userStore}
                <NavLi>
                    <form method="POST" action="/logout" class="inline">
                        <button type="submit">Logout</button>
                    </form>
                </NavLi>
            {:else}
                <NavLi href="/login">Login</NavLi>
                <NavLi href="/register">Register</NavLi>
            {/if}
        </NavUl>
    </Navbar>
</slot>
