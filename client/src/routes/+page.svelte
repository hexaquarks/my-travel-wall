<script>
    import {
        Navbar,
        NavBrand,
        NavUl,
        NavHamburger,
        NavLi,
    } from "flowbite-svelte";
    function authenticate() {
        window.location.href = "/auth";
    }
</script>

<Navbar>
    <NavBrand href="/">
        <!-- <img -->
        <!--     src="/images/flowbite-svelte-icon-logo.svg" -->
        <!--     class="me-3 h-6 sm:h-9" -->
        <!--     alt="Flowbite Logo" -->
        <!-- /> -->
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >MyTravelWall</span
        >
    </NavBrand>
    <NavHamburger />
    <NavUl>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/auth?mode=signin">Sign In</NavLi>
        <NavLi href="/auth?mode=signup">Sign Up</NavLi>
    </NavUl>
</Navbar>
<button on:click={() => authenticate()} />

<nav>
    <a href="/">home</a>
    <a href="/about">about</a>
</nav>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
