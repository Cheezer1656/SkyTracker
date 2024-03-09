<svelte:head>
    <title>SkyTracker - Coflnet Crafts</title>
</svelte:head>

<script>
    import { SkyblockDataHandler, friendly_name } from "$lib";
    import CraftPreview from "src/components/CraftPreview.svelte";
    import { browser } from "$app/environment";

    const settings = {
        sortBy: "profit"
    }

    const sortMethods = {
        "profit": (x, y) => (y.sellPrice-y.craftCost)-(x.sellPrice-x.craftCost),
    }

    async function get_processed_data() {
        if (browser) {
            const results = (await SkyblockDataHandler.get_coflnet_crafts()).slice();
            results.sort(sortMethods[settings.sortBy]);
            await Promise.all(results.map(async (x) => {
                x.itemName = await friendly_name(x.itemId);
            }));
            return results;
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