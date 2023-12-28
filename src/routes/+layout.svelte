<script>
    import "src/styles.scss";
    import { onMount } from 'svelte';

    onMount(async () => {
        await import('bootstrap/dist/js/bootstrap.js');
    });
</script>

<nav class="navbar bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand text-white" href="/">SkyTracker</a>
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
                <a class="nav-link text-white" href="/bazaar">Bazaar</a>
            </li>
        </ul>
    </div>
</nav>

<slot />