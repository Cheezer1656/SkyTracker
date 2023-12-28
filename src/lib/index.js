async function get_bz_data() {
    return await fetch("https://api.hypixel.net/v2/skyblock/bazaar").then(res => res.json());
}

function process_bz_data(data) {
    const results = [];
    for (const product of Object.values(data.products)) {
        const status = product.quick_status;
        const buy_price = status.buyPrice;
        const sell_price = status.sellPrice;
        const buy_demand = status.buyMovingWeek;
        const sell_demand = status.sellMovingWeek;
        if (buy_price === null || sell_price === null) {
            continue;
        } else if (buy_price > 1000 && sell_price > 1000 && buy_price / sell_price > 1.2 && buy_demand > 900000 && sell_demand > 1000000) {
            results.push(product);
        }
    }
    results.sort((x, y) => x.quick_status.buyPrice / x.quick_status.sellPrice - y.quick_status.buyPrice / y.quick_status.sellPrice);
    results.reverse();
    return results;
}

function simplify_num(num) {
    if (num < 1000) {
        return Math.round(num * 10) / 10;
    } else if (num < 1000000) {
        return Math.round(num / 100) / 10 + "K";
    } else if (num < 1000000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100000000) / 10 + "B";
    }
}

export { get_bz_data, process_bz_data, simplify_num };