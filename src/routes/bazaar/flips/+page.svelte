<svelte:head>
    <title>SkyTracker - Bazaar</title>
</svelte:head>

<script>
    import { SkyblockDataHandler } from "$lib";
    import FlipPreview from "src/components/FlipPreview.svelte";
    import { browser } from "$app/environment";

    const settings = {
        minBuyPrice: 1000,
        minSellPrice: 1000,
        minBuyVolume: 900000,
        minSellVolume: 1000000,
        minMargin: 20,
        minProfit: 1000,
        sortBy: "margin"
    }

    const sortMethods = {
        "margin": (x, y) => (y.quick_status.buyPrice - y.quick_status.sellPrice) / y.quick_status.sellPrice - (x.quick_status.buyPrice - x.quick_status.sellPrice) / x.quick_status.sellPrice,
        "profit": (x, y) => y.quick_status.buyPrice - y.quick_status.sellPrice - x.quick_status.buyPrice + x.quick_status.sellPrice,
        "buyPrice": (x, y) => y.quick_status.buyPrice - x.quick_status.buyPrice,
        "sellPrice": (x, y) => y.quick_status.sellPrice - x.quick_status.sellPrice,
        "buyVolume": (x, y) => y.quick_status.buyMovingWeek - x.quick_status.buyMovingWeek,
        "sellVolume": (x, y) => y.quick_status.sellMovingWeek - x.quick_status.sellMovingWeek
    }

    async function get_processed_data() {
        if (browser) {
            const results = [];
            for (const product of Object.values(await SkyblockDataHandler.get_bz_data())) {
                const status = product.quick_status;
                const buyPrice = status.buyPrice;
                const sellPrice = status.sellPrice;
                const buyVolume = status.buyMovingWeek;
                const sellVolume = status.sellMovingWeek;
                if (buyPrice === null || sellPrice === null) {
                    continue;
                }
                else if (buyPrice > settings.minBuyPrice && sellPrice > settings.minSellPrice && buyVolume > settings.minBuyVolume && sellVolume > settings.minSellVolume && ((buyPrice - sellPrice) / sellPrice * 100) > settings.minMargin && buyPrice - sellPrice > settings.minProfit) {
                    results.push(product);
                }
            }
            results.sort(sortMethods[settings.sortBy]);
            return results.map(product => product.quick_status);
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
                    <option value="margin">Margin</option>
                    <option value="profit">Profit</option>
                    <option value="buyPrice">Buy Price</option>
                    <option value="sellPrice">Sell Price</option>
                    <option value="buyVolume">Buy Volume</option>
                    <option value="sellVolume">Sell Volume</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="sortBy" class="form-label text-white">Min Buy Price:</label>
            </div>
            <div class="col">
                <input bind:value={settings.minBuyPrice} type="number" class="form-control mt-3" />
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="sortBy" class="form-label text-white">Min Sell Price:</label>
            </div>
            <div class="col">
                <input bind:value={settings.minSellPrice} type="number" class="form-control mt-3" />
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="sortBy" class="form-label text-white">Min Buy Volume:</label>
            </div>
            <div class="col">
                <input bind:value={settings.minBuyVolume} type="number" class="form-control mt-3" />
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="sortBy" class="form-label text-white">Min Sell Volume:</label>
            </div>
            <div class="col">
                <input bind:value={settings.minSellVolume} type="number" class="form-control mt-3" />
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="sortBy" class="form-label text-white">Min Margin:</label>
            </div>
            <div class="col">
                <input bind:value={settings.minMargin} type="number" class="form-control mt-3" />
            </div>
        </div>
        <div class="row">
            <div class="col-1">
                <label for="sortBy" class="form-label text-white">Min Profit:</label>
            </div>
            <div class="col">
                <input bind:value={settings.minProfit} type="number" class="form-control mt-3" />
            </div>
        </div>
    </form>
    <div class="text-center p-3 pb-5">
        <h1 class="text-white"><strong>Top Flips</strong></h1>
    </div>
    {#key settings}
        {#await get_processed_data() then data}
            <div class="row row-cols-1 row-cols-md-2 g-4 p-5 pt-0">
                {#each data as product}
                    <div class="col">
                        <FlipPreview {product} />
                    </div>
                {/each}
            </div>
        {/await}
    {/key}
</div>