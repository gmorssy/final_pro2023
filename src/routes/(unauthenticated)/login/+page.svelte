<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let rotateGradient = 0;
    let changeRGB = 255;
    let showSign = "in";

    setInterval(() => {
        rotateGradient++;
    }, 5);
</script>

<main>
    <div
        id="outline"
        style="border-image-source: linear-gradient({rotateGradient}deg, #3a92d5, #d53ac0);"
    >
        <div>
            <div id="content">
                <div id="nav">
                    <button
                        id="sign-in"
                        on:click={() => {
                            if (showSign != "in") {
                                showSign = "none";
                                changeRGB = 255;

                                setTimeout(() => {
                                    showSign = "in";
                                }, 200);
                            }
                        }}>SIGN IN</button
                    >
                    <button
                        id="sign-up"
                        on:click={() => {
                            if (showSign != "up") {
                                showSign = "none";
                                changeRGB = 255;

                                setTimeout(() => {
                                    showSign = "up";
                                }, 200);
                            }
                        }}>SIGN UP</button
                    >
                </div>
                {#if showSign == "in"}
                    <form
                        use:enhance
                        method="POST"
                        action="?/login"
                        in:fade={{ duration: 200 }}
                        out:fade={{ duration: 200 }}
                    >
                        <input
                            id="up"
                            name="email"
                            type="email"
                            placeholder="E-MAIL"
                            style="border-color: rgb(255, {changeRGB}, {changeRGB});"
                        />
                        <input
                            id="up"
                            name="password"
                            placeholder="PASSWORD"
                            type="password"
                            style="border-color: rgb(255, {changeRGB}, {changeRGB});"
                        />
                        <button id="up" style="width: 64%;">SIGN IN</button>

                        <p style="color: red; text-align: center;">
                            {form?.error}
                        </p>
                    </form>
                {/if}

                {#if showSign == "up"}
                    <form
                        use:enhance
                        method="POST"
                        action="?/register"
                        in:fade={{ duration: 200 }}
                        out:fade={{ duration: 200 }}
                    >
                        <input
                            id="up"
                            name="username"
                            placeholder="USERNAME"
                            style="border-color: rgb(255, {changeRGB}, {changeRGB});"
                            required
                        />
                        <input
                            id="up"
                            name="email"
                            type="email"
                            placeholder="E-MAIL"
                            style="border-color: rgb(255, {changeRGB}, {changeRGB});"
                            required
                        />
                        <input
                            id="up"
                            name="password"
                            placeholder="PASSWORD"
                            type="password"
                            style="border-color: rgb(255, {changeRGB}, {changeRGB});"
                            required
                        />

                        <input
                            id="up"
                            name="password2"
                            placeholder="CONFIRM PASSWORD"
                            type="password"
                            style="border-color: rgb(255, {changeRGB}, {changeRGB});"
                            required
                        />
                        <button
                            on:click={() => {
                                changeRGB = 0;
                            }}
                            id="up"
                            style="width: 64%;">SIGN UP</button
                        >

                        <p style="color: red; text-align: center;">
                            {form?.error}
                        </p>
                    </form>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }

    main {
        background-image: linear-gradient(
            rgba(36, 36, 36, 1),
            rgba(14, 14, 14, 1)
        );
        display: flex;
    }

    #outline {
        width: 500px;
        height: 640px;

        margin: auto auto;
        margin-top: 50px;
        margin-bottom: 50px;

        border: 10px solid;
        border-image-slice: 1;
        border-width: 10px;

        filter: drop-shadow(0 0 5px rgb(96, 96, 96));
    }

    #content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    #up {
        width: 60%;
        height: 40px;
        margin-top: 50px;

        border: 10px solid;
        border-image-slice: 1;
        border-radius: 30px;
        border-width: 5px;

        border-color: white;

        margin-left: 17%;

        transition: all 0.2s;
    }

    input::placeholder {
        color: white;
    }

    #nav {
        width: 40%;
        height: 40px;

        margin: auto auto;
        margin-top: 50px;
    }

    #sign-up {
        border-radius: 0;

        width: 48%;
        height: 100%;

        border: 10px solid;
        border-image-slice: 1;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border-width: 5px;

        border-color: white;
    }

    #sign-in {
        border-radius: 0;

        width: 48%;
        height: 100%;

        border: 10px solid;
        border-image-slice: 1;
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        border-width: 5px;

        border-color: white;
    }

    input {
        background-color: transparent;
        padding-left: 10px;

        color: white;
    }

    button {
        background-color: transparent;
        color: white;

        cursor: pointer;

        transition: all 0.2s;
    }

    button:hover {
        background-color: white;
        color: black;
    }
</style>
