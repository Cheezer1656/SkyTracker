<script>
    import { simplify_num, friendly_name } from "$lib";

    export let product;
</script>

<div class="card border-primary mb-3 position-relative h-100">
    <div class="card-header bg-primary">
        <div class="row">
            <div class="col">
                <a class="card-title text-info text-decoration-none" href={"/bazaar/item/"+product.productId}><strong>
                    {#await friendly_name(product.productId)}
                        {product.productId}
                    {:then itemName}
                        {itemName}
                    {/await}
                </strong></a>
            </div>
            <div class="col text-end">
                <a class="text-info text-decoration-none text-align-end" href={"https://www.skyblock.bz/product/"+product.productId}>
                    <img src="https://www.skyblock.bz/favicon.ico" alt="Bazaar Meta">
                </a>
            </div>
        </div>
    </div>
    <div class="card-body bg-primary">
        <p class="card-text text-tertiary">
            Buy Price: <span class="text-white">{simplify_num(product.buyPrice)} coins</span><br>
            Sell Price: <span class="text-white">{simplify_num(product.sellPrice)} coins</span><br>
            Buy Volume: <span class="text-white">{simplify_num(product.buyVolume)}</span><br>
            Sell Volume: <span class="text-white">{simplify_num(product.sellVolume)}</span><br>
            Margin: <span class="text-white">{Math.round(((product.buyPrice - product.sellPrice) / product.sellPrice)*10000)/100}%</span><br>
            Profit: <span class="text-white">{simplify_num(product.buyPrice - product.sellPrice)}</span> (x1) | <span class="text-white">{simplify_num((product.buyPrice - product.sellPrice)*64)}</span> (x64) | <span class="text-white">{simplify_num((product.buyPrice - product.sellPrice)*160)}</span> (x160) | <span class="text-white">{simplify_num((product.buyPrice - product.sellPrice)*1024)}</span> (x1024)
        </p>
    </div>
</div>