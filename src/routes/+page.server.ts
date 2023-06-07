import { database } from "$lib/ssr";

export function load() {
    const games = database.game.findMany();

    return {
        games
    };
}
