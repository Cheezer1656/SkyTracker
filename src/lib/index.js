export class SkyblockDataHandler {
    constructor() {
        return (async () => {
            this.max_depth = 2;
            this.item_mappings = await fetch("https://corsproxy.io/?https://github.com/kr45732/skyblock-plus-data/raw/main/InternalNameMappings.json").then(res => res.json())
            this.items = Object.keys(this.item_mappings);
            await this.update_data();
            return this;
        })();
    }

    async update_data() {
        this.bz_data = await SkyblockDataHandler.get_bz_data();
        this.bz_keys = Object.keys(this.bz_data);
        this.ah_data = await SkyblockDataHandler.get_lowest_bins();
        this.ah_keys = Object.keys(this.ah_data);
    }

    static async get_bz_data() {
        return (await fetch("https://api.hypixel.net/v2/skyblock/bazaar").then(res => res.json())).products;
    }

    static async get_coflnet_crafts() {
        return await fetch("https://sky.coflnet.com/api/craft/profit").then(res => res.json());
    }

    static async get_lowest_bins() {
        const ds = new DecompressionStream("gzip");
        const stream = (await fetch("https://corsproxy.io/?http://moulberry.codes/lowestbin.json.gz")).body;
        const decompressionStream = stream.pipeThrough(ds);
        return await new Response(decompressionStream).json();
    }

    get_item_price(id, remaining_depth=null) {
        if (remaining_depth == null) {
            remaining_depth = this.max_depth;
        }
        id = id.replaceAll("-", ":");
        const item_info = this.item_mappings[id];
        var sell_price = null;
        if (this.ah_keys.includes(id)) {
            sell_price = this.ah_data[id];
        }
        else if (this.bz_keys.includes(id)) {
            sell_price = this.bz_data[id].quick_status.sellPrice;
        }
        var price = 0
        if (remaining_depth > 0 && item_info["recipe"] != null) {
            for (const item of Object.values(item_info["recipe"])) {
                if (item != "" && typeof item === "string") {
                    const split = item.split(":");
                    price += this.get_item_price(split[0], remaining_depth-1)*parseInt(split[1]);
                }
            }
            if (item_info["recipe"]["count"] != null) {
                price /= item_info["recipe"]["count"];
            }
            if (sell_price != null) {
                price = Math.min(price, sell_price);
            }
            return price;
        }
        if (sell_price == null) {
            throw new Error("No price data available for item " + id);
        }
        return sell_price;
    }

    find_crafts(max_depth=2) {
        this.max_depth = max_depth;
        const results = [];
        for (const item of this.items) {
            try {
                results.push({"itemId": item, "itemName": strip_color_codes(this.item_mappings[item].name), "sellPrice": this.get_item_price(item, 0), "craftCost": this.get_item_price(item, max_depth)});
            } catch (e) {}
        }
        return results.sort((x, y) => (y.sellPrice - y.craftCost) - (x.sellPrice - x.craftCost));
    }
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

export async function friendly_name(id) {
    // var split = id.split("_");
    // if (split[0] == "ENCHANTMENT" && !isNaN(parseInt(split[split.length-1]))) {
    //     split.shift();
    //     var num = split.pop();
    //     id = split.join("_")+";"+num;
    // }
    var name = (await fetch(`https://raw.githubusercontent.com/NotEnoughUpdates/NotEnoughUpdates-REPO/master/items/${id}.json`).then(res => res.json())).displayname;
    return strip_color_codes(name);
}

const color_code_regex = RegExp("§.{1}", "g")
export function strip_color_codes(str) {
    return str.replaceAll(color_code_regex, "");
}