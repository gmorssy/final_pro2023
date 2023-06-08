import { error, type Actions, redirect } from '@sveltejs/kit';
import { database } from "$lib/ssr";

export async function load({ params }) {
    const post = database.game.findMany();

    let game = (await post).find((e) => e.id.toString() === params.slug)

    if (!game) throw error(404);

    return {
        game
    };
}

export const actions: Actions = {
    cart: async ({ request, locals }) => {
        const session = locals.session;
        const form = await request.formData();

        const item = form.get("item")?.toString();

        if (session) {
            const users = await database.user.findUnique({ where: { session } });
            let newCart;
            let cartStr = "";

            if (users?.cart == undefined) {
                newCart = "";
            }

            else {
                newCart = users?.cart.split(";");
                newCart?.pop();

                for (let i = 0; i < newCart.length; i++) {
                    cartStr += newCart[i];
                    cartStr += ";";
                }
            }

            if (item && users && newCart?.indexOf(item!) == -1) {
                const updateUser = await database.user.update({
                    where: {
                        session,
                    },
                    data: {
                        cart: cartStr + item + ";"
                    },
                })
            }

        }

        else {
            throw redirect(302, "/login");
        }


    }
};
