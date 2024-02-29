<svelte:head>
    <title>SkyTracker - Crafts</title>
</svelte:head>

<script>
    import { get_ah_crafts, process_ah_data } from "$lib";
    import CraftPreview from "src/components/CraftPreview.svelte";

    const settings = {
        sortBy: "profit"
    }

    async function get_processed_data() {
        return process_ah_data(await get_ah_crafts(), settings);
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