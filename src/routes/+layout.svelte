<script>
    import "src/styles.scss";
    import { onMount } from 'svelte';

    var searchQuery = "";

    onMount(async () => {
        await import('bootstrap/dist/js/bootstrap.js');
    });
</script>

<nav class="navbar bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand text-white" href="/">SkyTracker</a>
        <ul class="navbar-nav me-auto">
            <div class="row">
                <div class="col">
                    <li class="nav-item">
                        <form on:submit|preventDefault={e => {if (searchQuery != "") {window.location.replace("/bazaar/search?q="+searchQuery)}}}>
                            <input class="form-control bg-secondary text-white" style="border: none" type="text" bind:value={searchQuery}>
                        </form>
                    </li>
                </div>
                <div class="col">
                    <li class="nav-item dropdown">
                        <a id="bz-dropdown" class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Bazaar
                        </a>
                        <ul class="dropdown-menu bg-secondary position-absolute" aria-labelledby="bz-dropdown">
                            <li><a class="dropdown-item text-white" href="/bazaar/flips">Flips</a></li>
                        </ul>
                    </li>
                </div>
            </div>
        </ul>
    </div>
</nav>

<slot />