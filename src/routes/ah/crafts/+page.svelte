<svelte:head>
    <title>SkyTracker - Crafts</title>
</svelte:head>

<script>
    import { SkyblockDataHandler } from "$lib";
    import CraftPreview from "src/components/CraftPreview.svelte";
    import { browser } from "$app/environment";

    const settings = {
        sortBy: "profit",
        buyOrder: "true",
        maxDepth: 2,
        itemsShown: 50
    };

    const sortMethods = {
        "profit": (x, y) => (y.sellPrice-y.craftCost)-(x.sellPrice-x.craftCost),
    };

    async function get_processed_data() {
        if (browser) {
            var sb = await new SkyblockDataHandler(settings);
            var crafts = sb.find_crafts().sort(sortMethods[settings.sortBy]);
            return crafts.splice(0, settings.itemsShown);
        }
    }
</script>

<div class="container p-5">
    <div class="text-center p-3 pb-5">
        <h1 class="text-white"><strong>Settings</strong></h1>
    </div>
    <form class="bg-primary p-5 rounded">
        <div class="row">
            <div class="col-1">
                <label for="sortBy" class="form-label text-white">Sort By:</label>
            </div>
            <div class="col">
                <select bind:value={settings.sortBy} name="sortBy" class="form-select">
                    <option value="profit">Profit</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="buyOrder" class="form-label text-white">Buy Order:</label>
            </div>
            <div class="col">
                <select bind:value={settings.buyOrder} name="buyOrder" class="form-select mt-3">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="maxDepth" class="form-label text-white">Max Depth:</label>
            </div>
            <div class="col">
                <input type="number" bind:value={settings.maxDepth} name="maxDepth" class="form-control mt-3" min="1" max="5" />
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="itemsShown" class="form-label text-white">Items Shown:</label>
            </div>
            <div class="col">
                <input type="number" bind:value={settings.itemsShown} name="itemsShown" class="form-control mt-3" min="1" />
            </div>
        </div>
    </form>
    <div class="text-center p-3 pb-5">
        <h1 class="text-white"><strong>Top Crafts</strong></h1>
    </div>
    {#key settings}
        {#await get_processed_data() then data}
            <div class="row row-cols-1 row-cols-md-2 g-4 p-5 pt-0">
                {#each data as product}
                    <div class="col">
                        <CraftPreview {product} />
                    </div>
                {/each}
            </div>
        {/await}
    {/key}
</div>