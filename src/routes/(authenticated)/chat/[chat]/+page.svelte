<script lang="ts">
    import { browser } from "$app/environment";
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { onDestroy } from "svelte";
    import type { ActionData, PageServerData } from "./$types";
    import ReconnectingEventSource from "reconnecting-eventsource";

    export let data: PageServerData;
    export let form: ActionData;

    let inputRef: HTMLElement;

    $: messages = [...data.chat.messages].reverse();

    if (browser) {
        let es: ReconnectingEventSource;

        es = new ReconnectingEventSource(`/chat/${$page.params.chat}`);
        es.onmessage = (event) => {
            const message = JSON.parse(event.data);

            /* add the new message */
            if (message) {
                message.timestamp = new Date(message.timestamp.toString());
                messages = [message, ...messages];
            }
        };

        onDestroy(() => {
            es.close();
        });
    }
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main>
    {#if data?.chat}
        <div class="information">
            <div class="upper-text">
                {#if data.chat.tag == "guide"}
                    <div class="tag guide">
                        <p class="tag-text">guide</p>
                    </div>
                {/if}
                {#if data.chat.tag == "idea"}
                    <div class="tag idea">
                        <p class="tag-text">idea</p>
                    </div>
                {/if}
                {#if data.chat.tag == "general"}
                    <div class="tag general">
                        <p class="tag-text">general</p>
                    </div>
                {/if}
                <p class="title">{data.chat.name}</p>
                <p class="author">
                    By: {data.chat.author} | Game: {data.chat.game}
                </p>
            </div>
            <div class="more-text">
                <p>{data.chat.description}</p>
            </div>
        </div>
        <div class="chat-side">
            <div class="chat">
                {#each messages as message}
                    <div class="message" class:own={message.own}>
                        <p>
                            {@html message.content}
                        </p>
                        <i class="chat-info"
                            >{message.own
                                ? message.author?.username + " at "
                                : ""}{message.timestamp.toDateString()}</i
                        >
                        {#if !message.own && !message.liked}
                            <form use:enhance method="post" action="?/like">
                                <input
                                    type="hidden"
                                    name="messageId"
                                    value={message.id}
                                />
                                <button type="submit"
                                    ><i class="fa fa-thumbs-o-up" /></button
                                >
                            </form>
                        {:else if !message.own}
                            <form use:enhance method="post" action="?/unlike">
                                <input
                                    type="hidden"
                                    name="messageId"
                                    value={message.id}
                                />
                                <button type="submit"
                                    ><i class="fa fa-thumbs-up" /></button
                                >
                            </form>
                        {/if}
                    </div>
                {/each}
            </div>
            <form
                use:enhance={({}) => {
                    return async ({ update }) => {
                        await update(); // Call the default behavior of a form submission response.
                        inputRef.focus(); // focus the input field
                    };
                }}
                method="post"
                action="?/write"
                style="width: 50%;"
            >
                <input
                    bind:this={inputRef}
                    name="message"
                    placeholder="message"
                    id=""
                />
                <button type="submit">Send</button>
                {#if form?.error}
                    <p style="color: red;">{form.error}</p>
                {/if}
                <input type="submit" hidden />
            </form>
        </div>
    {/if}
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");

    :global(body) {
        margin: 0;

        background-image: linear-gradient(
            rgba(36, 36, 36, 1),
            rgba(14, 14, 14, 1)
        );
        background-repeat: no-repeat;

        height: 50em;
    }

    main {
        display: flex;
        flex-direction: row;
    }

    .upper-text {
        display: flex;
        flex-direction: row;
    }

    .title {
        margin: 0.2em;

        font-size: 2em;
    }

    .chat-info {
        color: white;
        font-family: "Anton", sans-serif;
        text-transform: uppercase;
    }

    button {
        background-color: black;
        border-radius: 2em;

        color: white;
        font-family: "Anton", sans-serif;
        text-transform: uppercase;

        border: 5px solid white;

        cursor: pointer;

        transition: all 0.2s;
    }

    button:hover {
        background-color: white;
        color: black;
    }

    .author {
        margin-left: 1em;
        font-size: 1em;
    }

    .information {
        width: 70%;
        height: 30em;

        margin-top: 10em;
        margin-left: 2em;
        margin-right: 2em;

        border: 0.7em solid white;
        border-radius: 2em;
    }

    .more-text {
        margin: 0 1em;
        word-break: break-all;
        height: 10em;
    }

    .chat-side {
        display: flex;
        flex-direction: column;

        margin-top: 5em;

        width: 100%;
    }

    .chat {
        width: 50%;
        display: flex;
        flex-direction: column-reverse;
        max-height: 35em;
        overflow-y: scroll;
    }

    .message {
        display: flex;
        flex-direction: column;
        gap: 0px;
        margin: 4px;
        padding: 8px;
        background-color: rgb(138, 138, 138);

        border-radius: 0.5em;
    }

    .message.own {
        place-items: end;
        background-color: rgb(0, 187, 255);
    }
    p {
        font-family: "Anton", sans-serif;
        text-transform: uppercase;

        color: white;
    }

    .guide {
        background-color: rgb(0, 255, 128);
    }

    .idea {
        background-color: rgb(0, 166, 255);
    }

    .general {
        background-color: rgb(221, 0, 255);
    }

    .tag {
        width: 110px;
        height: 60px;

        margin-left: 1em;

        border-radius: 40px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tag-text {
        font-size: 1.5em;

        filter: none;
    }

    textarea {
        resize: none;
    }
</style>
