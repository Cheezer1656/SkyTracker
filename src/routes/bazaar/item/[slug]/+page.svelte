<svelte:head>
    <title>SkyTracker - Bazaar</title>
</svelte:head>

<script>
    import { simplify_num, friendly_name } from "$lib";

    export let data;
    var status = data.product.quick_status;
    var buyPrice = status.buyPrice;
    var sellPrice = status.sellPrice;
    var buyVolume = status.buyMovingWeek;
    var sellVolume = status.sellMovingWeek;
</script>

<div class="container text-center p-3">
    <h1 class="text-white">
        {#await friendly_name(status.productId)}
            {status.productId}
        {:then itemName} 
            {itemName}
        {/await}
    </h1>
    <div class="row row-cols-2 g-2 p-3">
        <div class="col">
            <div class="bg-primary text-center p-3 rounded">
                <h4 class="text-white">{simplify_num(buyPrice)} coins</h4>
                <h5 class="text-tertiary">Buy Price</h5>
            </div>
        </div>
        <div class="col">
            <div class="bg-primary text-center p-3 rounded">
                <h4 class="text-white">{simplify_num(sellPrice)} coins</h4>
                <h5 class="text-tertiary">Sell Price</h5>
            </div>
        </div>
        <div class="col">
            <div class="bg-primary text-center p-3 rounded">
                <h4 class="text-white">{simplify_num(buyVolume)}</h4>
                <h5 class="text-tertiary">Insta-buys in a week</h5>
            </div>
        </div>
        <div class="col">
            <div class="bg-primary text-center p-3 rounded">
                <h4 class="text-white">{simplify_num(sellVolume)}</h4>
                <h5 class="text-tertiary">Insta-sells in a week</h5>
            </div>
        </div>
        <div class="col">
            <div class="bg-primary text-center p-3 rounded">
                <h4 class="text-white">{Math.round(((buyPrice - sellPrice) / sellPrice)*10000)/100}%</h4>
                <h5 class="text-tertiary">Margin (%)</h5>
            </div>
        </div>
        <div class="col">
            <div class="bg-primary text-center p-3 rounded">
                <h4 class="text-white">{simplify_num(buyPrice - sellPrice)} coins</h4>
                <h5 class="text-tertiary">Margin ($)</h5>
            </div>
        </div>
    </div>
</div>