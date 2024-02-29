<script>
    import { simplify_num, friendly_name } from "$lib";

    export let product;
    var buyPrice = product.buyPrice;
    var sellPrice = product.sellPrice;
    var buyVolume = product.buyMovingWeek;
    var sellVolume = product.sellMovingWeek;
</script>

<div class="card border-primary mb-3 position-relative h-100">
    <div class="card-header bg-primary">
        <a class="card-title text-info text-decoration-none" href={"/bazaar/item/"+product.productId}><strong>{friendly_name(product.productId)}</strong></a>
    </div>
    <div class="card-body bg-primary">
        <p class="card-text text-tertiary">
            Buy Price: <span class="text-white">{simplify_num(buyPrice)} coins</span><br>
            Sell Price: <span class="text-white">{simplify_num(sellPrice)} coins</span><br>
            Buy Volume: <span class="text-white">{simplify_num(buyVolume)}</span><br>
            Sell Volume: <span class="text-white">{simplify_num(sellVolume)}</span><br>
            Margin: <span class="text-white">{Math.round(((buyPrice - sellPrice) / sellPrice)*10000)/100}%</span><br>
            Profit: <span class="text-white">{simplify_num(buyPrice - sellPrice)}</span> (x1) | <span class="text-white">{simplify_num((buyPrice - sellPrice)*64)}</span> (x64) | <span class="text-white">{simplify_num((buyPrice - sellPrice)*160)}</span> (x160) | <span class="text-white">{simplify_num((buyPrice - sellPrice)*1024)}</span> (x1024)
        </p>
    </div>
</div>