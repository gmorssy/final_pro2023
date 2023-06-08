import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { database } from "$lib/ssr";

export const load: PageServerLoad = async ({ locals }) => {
    const chats = await database.chat.findMany();
    const games = await database.game.findMany();

    const favoriteChats = await database.user.findUniqueOrThrow({
        where: { session: locals.session },
        select: {
            favoriteChats: { select: { id: true } },
        },
    });

    return { chats, games, favoriteChats: favoriteChats.favoriteChats.map((e: any) => e.id) };
};

export const actions: Actions = {
    add: async ({ request, locals }) => {
        const form = await request.formData();
        const forumname = form.get("chatname")?.toString();
        const forumtag = form.get("tag")?.toString();
        const forumgame = form.get("game")?.toString();
        const forumdescription = form.get("description")?.toString();

        let author = "";

        if (!forumname) {
            return fail(400, { error: "missing chat name" });
        } else {
            try {
                console.log(forumgame);
                console.log(forumtag);
                console.log(forumdescription);

                const session = locals.session;
                const users = await database.user.findUnique({ where: { session } });

                if (users) {
                    author = users.username;
                }

                if ((forumtag && forumgame && forumdescription) || (forumtag && forumgame && forumdescription == "")) {
                    await database.chat.create({
                        data: { name: forumname, tag: forumtag, description: forumdescription, author, game: forumgame },
                    });
                }

                else {
                    return fail(400, { error: "something went wrong" });
                }
            } catch (e) {
                return fail(400, { error: "chat creation error" });
            }
        }
    },
    favorite: async ({ request, locals }) => {
        const form = await request.formData();
        const chatId = form.get("chatId")?.toString();
        if (!chatId) {
            return fail(400, { error: "missing chatId" });
        } else {
            try {
                const user = await database.user.findUniqueOrThrow({
                    where: { session: locals.session },
                });

                await database.chat.update({
                    where: {
                        id: Number(chatId),
                    },
                    data: {
                        favoritedBy: {
                            connect: { id: user.id },
                        },
                    },
                });
            } catch (e) {
                console.log(e);
                return fail(400, { error: "chat favorite error" + e });
            }
        }
    },
    unfavorite: async ({ request, locals }) => {
        const form = await request.formData();
        const chatId = form.get("chatId")?.toString();
        if (!chatId) {
            return fail(400, { error: "missing chatId" });
        } else {
            try {
                const user = await database.user.findUniqueOrThrow({
                    where: { session: locals.session },
                });

                await database.chat.update({
                    where: {
                        id: Number(chatId),
                    },
                    data: {
                        favoritedBy: {
                            disconnect: { id: user.id },
                        },
                    },
                });
            } catch (e) {
                console.log(e);
                return fail(400, { error: "chat favorite error" + e });
            }
        }
    },
};