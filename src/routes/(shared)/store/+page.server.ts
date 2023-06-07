import { database } from "$lib/ssr";
import type { Game } from "$lib/interfaces/store";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    let games = await database.game.findMany();
    let newGames: Game[] = [];

    for (let i = 0; i < games.length; i++) {
        newGames.push({ id: games[i].id, title: games[i].title, subtitle: games[i].subtitle, description: games[i].description, image: games[i].image, showMore: false });
    }

    return {
        games: newGames,
        session: locals.session
    };
}

export const actions: Actions = {
    cart: async ({ request, locals }) => {
        const session = locals.session;
        const form = await request.formData();

        const item = form.get("item")?.toString();

        if (session) {
            const users = await database.user.findUnique({ where: { session } });

            let newCart = users?.cart.split(";");
            newCart?.pop();
            newCart?.shift();



            if (users && newCart?.indexOf(item!) == -1) {
                const updateUser = await database.user.update({
                    where: {
                        session,
                    },
                    data: {
                        cart: users.cart + item + ";"
                    },
                })
            }

        }

        else {
            throw redirect(302, "/login");
        }


    }
};