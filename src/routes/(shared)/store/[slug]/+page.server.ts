import { error } from '@sveltejs/kit';
import { database } from "$lib/ssr";

export async function load({ params }) {
    const post = database.game.findMany();

    let game = (await post).find((e) => e.id.toString() === params.slug)

    if (!game) throw error(404);

    return {
        game
    };
}
