import { get_bz_data } from "$lib";

export async function load({ params }) {
    return {
        product: await get_bz_data().then(data => data.products[params.slug])
    }
}