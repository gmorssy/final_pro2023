import { database } from "$lib/ssr";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/auth";
import * as crypto from "crypto";

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const form = await request.formData();

        const { success, error } = await auth.login(form);

        if (error) {
            return fail(error.code, error.data);
        }

        else {
            cookies.set("session", success.session, {
                path: "/",
                httpOnly: true, // optional for now
                sameSite: "strict", // optional for now
                secure: process.env.NODE_ENV === "production", // optional for now
                maxAge: 120, //
            });
            throw redirect(302, "/");
        }

    },

    register: async ({ request, locals, cookies }) => {
        const form = await request.formData();

        const username = form.get("username")?.toString();
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();
        const password2 = form.get("password2")?.toString();

        if (username && email && password && password2) {
            let users = await database.user.findUnique({ where: { username } });

            if (!users) {
                const session = crypto.randomUUID();

                const salt = crypto.randomBytes(16).toString('hex');

                const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');


                const user = await database.user.create({
                    data: { email, username, salt, hash, session, cart: ";" },
                });

                cookies.set("session", user.session, {
                    path: "/",
                    httpOnly: true, // optional for now
                    sameSite: "strict", // optional for now
                    secure: process.env.NODE_ENV === "production", // optional for now
                    maxAge: 120, //
                });
                throw redirect(302, "/");
            }
        }
        // TODO: Implement register
        // Check if ustername already exist etc.

        return {
            error: "error my guy",
        };
    },
};