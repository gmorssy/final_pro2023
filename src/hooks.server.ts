import type { Handle } from "@sveltejs/kit";
import { database } from "$lib/ssr";

// handle runs for every request to the server
export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get("session");

    if (session) {
        let result = await database.user.findUnique({ where: { session } });
        if (result?.session) {
            event.locals.session = result.session;
        }
    }

    if (event.request.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }

    const response = await resolve(event);
    response.headers.append("Access-Control-Allow-Origin", `*`);
    return response;
};