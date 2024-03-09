import { SkyblockDataHandler } from "$lib";

export async function load({ params }) {
    return {
        product: await SkyblockDataHandler.get_bz_data().then(data => data[params.slug])
    }
}