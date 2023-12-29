<svelte:head>
    <title>SkyTracker - Bazaar</title>
</svelte:head>

<script>
    import ProductPreview from "src/components/productPreview.svelte";
    import { get_bz_data, friendly_name } from "$lib";
    import { page } from "$app/stores";

    async function get_filtered_data() {
        return await get_bz_data().then(data => Object.values(data.products).map(product => product.quick_status).filter(product => friendly_name(product.productId).toLowerCase().includes($page.url.searchParams.get("q").toLowerCase())));
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
                            <ProductPreview {product} />
                        </div>
                    {/each}
                </div>
            {:else}
                <h3 class="text-white text-center">No results found.</h3>
            {/if}
        {/await}
</div>