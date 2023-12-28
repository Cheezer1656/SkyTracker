<script>
    import { simplify_num } from "$lib";

    export let item;
    var buyPrice = item.buyPrice;
    var sellPrice = item.sellPrice;
    var buyVolume = item.buyMovingWeek;
    var sellVolume = item.sellMovingWeek;
</script>

<div class="card border-primary mb-3 position-relative h-100">
    <div class="card-header bg-primary">
        <h5 class="card-title text-info">{item.productId}</h5>
    </div>
    <div class="card-body bg-primary">
        <p class="card-text text-white">
            Buy Price: {simplify_num(buyPrice)}<br>
            Sell Price: {simplify_num(sellPrice)}<br>
            Buy Volume: {simplify_num(buyVolume)}<br>
            Sell Volume: {simplify_num(sellVolume)}<br>
            Margin: {Math.round((buyPrice/sellPrice)*100)/100}%<br>
            Profit:
        </p>
        <ul>
            <li><p class="card-text text-white">(x1) {simplify_num(buyPrice - sellPrice)}</p></li>
            <li><p class="card-text text-white">(x64) {simplify_num((buyPrice - sellPrice) * 64)}</p></li>
            <li><p class="card-text text-white">(x1024) {simplify_num((buyPrice - sellPrice) * 1024)}</p></li>
        </ul>
    </div>
</div>