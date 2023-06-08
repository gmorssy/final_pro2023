import type { LayoutServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { database } from "$lib/ssr";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
    if (locals.session) {
        const user = await database.user.findUnique({
            where: { session: locals.session },
        });
        if (!user?.email) {
            throw error(404, "user not found for current session");
        }

        return {
            email: user.email,
            username: user.username,
            cart: user.cart
        };
    } else {
        throw redirect(302, "/login");
    }
};