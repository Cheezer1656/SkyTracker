<script>
    import { simplify_num, friendly_name } from "$lib";

    export let product;
</script>

<div class="card border-primary mb-3 position-relative h-100">
    <div class="card-header bg-primary">
        <a class="card-title text-info text-decoration-none" href={"https://sky.coflnet.com/item/"+product.itemId} target="_blank">
            <strong>{product.itemName}</strong>
        </a>
    </div>
    <div class="card-body bg-primary">
        <p class="card-text text-tertiary">
            Craft Cost: <span class="text-white">{simplify_num(product.craftCost)} coins</span><br>
            Sell Price: <span class="text-white">{simplify_num(product.sellPrice)} coins</span><br>
            {#if product.median}
            Median: <span class="text-white">{simplify_num(product.median)} coins</span><br>
            {/if}
            Profit: <span class="text-white">{simplify_num(product.sellPrice - product.craftCost)}</span>
        </p>
    </div>
</div>