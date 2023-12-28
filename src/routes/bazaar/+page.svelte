<svelte:head>
    <title>SkyTracker - Bazaar</title>
</svelte:head>

<script>
    import { get_bz_data, process_bz_data } from "$lib";
    import ItemPreview from "src/components/itemPreview.svelte";

    async function get_processed_data() {
        return process_bz_data(await get_bz_data()).map(item => {
            return item.quick_status;
        });
    }
</script>

<div class="p-5">
    {#await get_processed_data() then data}
        <div class="row row-cols-1 row-cols-md-2 g-4 p-5 pt-0">
            {#each data as item}
                <div class="col">
                    <ItemPreview {item} />
                </div>
            {/each}
        </div>
    {/await}
</div>