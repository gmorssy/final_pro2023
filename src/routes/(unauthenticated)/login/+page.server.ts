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
                maxAge: 1200, //
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
            const users = await database.user.findUnique({ where: { username } });
            const mailUser = await database.user.findUnique({ where: { email } });

            if (password == password2) {

                if (!users && !mailUser) {

                    if (password.length >= 8) {

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
                            maxAge: 1200, //
                        });
                        throw redirect(302, "/");
                    }

                    else {
                        return fail(400, { error: "Too weak password" });
                    }
                }

                else {
                    return fail(400, { error: "Already used account" });
                }
            }
            else {
                return fail(400, { error: "Incorrect confirm password" });
            }
        }
        // TODO: Implement register
        // Check if ustername already exist etc.

        return fail(400, { error: "Something went wrong" });
    },
};