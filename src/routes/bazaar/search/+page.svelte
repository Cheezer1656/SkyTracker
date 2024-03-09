<svelte:head>
    <title>SkyTracker - Bazaar</title>
</svelte:head>

<script>
    import FlipPreview from "src/components/FlipPreview.svelte";
    import { SkyblockDataHandler, strip_color_codes } from "$lib";
    import { page } from "$app/stores";

    async function get_filtered_data() {
        return await SkyblockDataHandler.get_bz_data().then(data => Object.values(data).map(product => product.quick_status).filter(async product => strip_color_codes(product.productId).toLowerCase().includes($page.url.searchParams.get("q").toLowerCase())));
    }
</script>

<div class="container p-5">
        {#await get_filtered_data()}
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        {:then data}
            {#if data.length > 0}
                <div class="row row-cols-1 row-cols-md-2 g-4 p-5 pt-0">
                    {#each data as product}
                        <div class="col">
                            <FlipPreview {product} />
                        </div>
                    {/each}
                </div>
            {:else}
                <h3 class="text-white text-center">No results found.</h3>
            {/if}
        {/await}
</div>