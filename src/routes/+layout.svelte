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
                    <div class="row">
                        <div class="col">
                            <li class="nav-item dropdown">
                                <a id="bz-dropdown" class="nav-link dropdown-toggle text-white" href={"#"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Bazaar
                                </a>
                                <ul class="dropdown-menu bg-secondary position-absolute" aria-labelledby="bz-dropdown">
                                    <li><a class="dropdown-item text-white" href="/bazaar/flips">Flips</a></li>
                                </ul>
                            </li>
                        </div>
                        <div class="col">
                            <li class="nav-item dropdown">
                                <a id="ah-dropdown" class="nav-link dropdown-toggle text-white" href={"#"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Auction House
                                </a>
                                <ul class="dropdown-menu bg-secondary position-absolute" aria-labelledby="ah-dropdown">
                                    <li><a class="dropdown-item text-white" href="/ah/coflnet_crafts">Coflnet Crafts</a></li>
                                    <li><a class="dropdown-item text-white" href="/ah/crafts">Crafts</a></li>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
        <a href="https://github.com/cheezer1656/skytracker">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
            </svg>
        </a>
    </div>
</nav>

<slot />