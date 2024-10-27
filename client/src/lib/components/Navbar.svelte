<script>
    import {
        Navbar,
        NavBrand,
        NavUl,
        NavHamburger,
        NavLi,
    } from "flowbite-svelte";
    import { LightSwitch } from "@skeletonlabs/skeleton";
</script>

<slot>
    <Navbar>
        <NavBrand href="/">
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                >MyTravelWall</span
            >
        </NavBrand>
        <NavHamburger />
        <NavUl>
            <LightSwitch />
            <NavLi href="/">Home</NavLi>
            <NavLi href="/wall">Build Wall</NavLi>
            <NavLi href="/login">Login</NavLi>
            <NavLi href="/register">Register</NavLi>
        </NavUl>
    </Navbar>
</slot>
