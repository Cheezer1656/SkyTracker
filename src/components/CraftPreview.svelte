<script>
    import { simplify_num, friendly_name } from "$lib";

    export let product;
    var itemName = product.itemName;
    var craftCost = product.craftCost;
    var sellPrice = product.sellPrice;
    var median = product.median;
</script>

<div class="card border-primary mb-3 position-relative h-100">
    <div class="card-header bg-primary">
        <a class="card-title text-info text-decoration-none" href="#"><strong>{friendly_name(itemName)}</strong></a>
    </div>
    <div class="card-body bg-primary">
        <p class="card-text text-tertiary">
            Craft Cost: <span class="text-white">{simplify_num(craftCost)} coins</span><br>
            Sell Price: <span class="text-white">{simplify_num(sellPrice)} coins</span><br>
            Median: <span class="text-white">{simplify_num(median)} coins</span><br>
            Profit: <span class="text-white">{simplify_num(sellPrice - craftCost)}</span>
        </p>
    </div>
</div>