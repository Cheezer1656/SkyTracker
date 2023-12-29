export async function get_bz_data() {
    return await fetch("https://api.hypixel.net/v2/skyblock/bazaar").then(res => res.json());
}

const sortMethods = {
    "margin": (x, y) => (x.quick_status.buyPrice - x.quick_status.sellPrice) / x.quick_status.sellPrice - (y.quick_status.buyPrice - y.quick_status.sellPrice) / y.quick_status.sellPrice,
    "profit": (x, y) => x.quick_status.buyPrice - x.quick_status.sellPrice - y.quick_status.buyPrice + y.quick_status.sellPrice,
    "buyPrice": (x, y) => x.quick_status.buyPrice - y.quick_status.buyPrice,
    "sellPrice": (x, y) => x.quick_status.sellPrice - y.quick_status.sellPrice,
    "buyVolume": (x, y) => x.quick_status.buyMovingWeek - y.quick_status.buyMovingWeek,
    "sellVolume": (x, y) => x.quick_status.sellMovingWeek - y.quick_status.sellMovingWeek
}

export function process_bz_data(data, settings) {
    const results = [];
    for (const product of Object.values(data.products)) {
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
    results.reverse();
    return results;
}

export function simplify_num(num) {
    if (num < 1000) {
        return Math.round(num * 10) / 10;
    } else if (num < 1000000) {
        return Math.round(num / 100) / 10 + "k";
    } else if (num < 1000000000) {
        return Math.round(num / 100000) / 10 + "m";
    } else {
        return Math.round(num / 100000000) / 10 + "b";
    }
}

export function friendly_name(name) {
    return name.replace(/_/g, " ").replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
}