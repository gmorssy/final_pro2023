<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData, PageData } from "./$types";

    let active = false;

    export let data: PageData;
    export let form: ActionData;
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main>
    <div class="items">
        <div class="content">
            {#each data.chats as chat}
                <div class="item">
                    {#if chat.tag == "guide"}
                        <div class="tag guide">
                            <p class="tag-text">guide</p>
                        </div>
                    {/if}
                    {#if chat.tag == "idea"}
                        <div class="tag idea">
                            <p class="tag-text">idea</p>
                        </div>
                    {/if}
                    {#if chat.tag == "general"}
                        <div class="tag general">
                            <p class="tag-text">general</p>
                        </div>
                    {/if}

                    <div class="titles">
                        <p class="item-title">
                            <a href={"/chat/" + chat.id}>{chat.name}</a>
                        </p>
                        <p class="item-subtitle">{chat.game}</p>
                    </div>
                    <div class="item-extra">
                        <p class="item-date">By: {chat.author}</p>
                    </div>

                    {#if data.favoriteChats.includes(chat.id)}
                        <form use:enhance action="?/unfavorite" method="post">
                            <input
                                type="hidden"
                                name="chatId"
                                value={chat.id}
                            />
                            <button type="submit"
                                ><i
                                    class="fa fa-heart"
                                    style="color: red;"
                                /></button
                            >
                        </form>
                    {:else}
                        <form use:enhance action="?/favorite" method="post">
                            <input
                                type="hidden"
                                name="chatId"
                                value={chat.id}
                            />
                            <button type="submit"
                                ><i class="fa fa-heart" /></button
                            >
                        </form>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    <div class="more">
        <div class="active">
            <form
                use:enhance={(e) => e.form.reset()}
                method="POST"
                action="?/add"
                class="add-chat"
            >
                <h1>a</h1>
                <h1>create chat</h1>
                <input
                    type="text"
                    name="chatname"
                    placeholder="Name"
                    required
                />

                <textarea
                    name="description"
                    rows="4"
                    cols="50"
                    placeholder="Description"
                />

                <labal
                    >tag
                    <select name="tag" id="tag">
                        <option value="general">General</option>
                        <option value="guide">Guide</option>
                        <option value="idea">Idea</option>
                    </select>
                </labal>

                <labal
                    >game
                    <select name="game" id="game">
                        {#each data.games as game}
                            <option value={game.title}>{game.title}</option>
                        {/each}
                    </select>
                </labal>

                <button class="add-chat-button">Add Chat</button>
                {#if form?.error}
                    <p style="color: red;">{form.error}</p>
                {/if}
            </form>
        </div>
    </div>
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
        overflow-y: hidden;
    }

    main {
        display: flex;
        flex-direction: row;
    }

    .content {
        margin-top: 5em;
        flex-direction: column;

        height: 40em;

        overflow-y: scroll;
    }

    .items {
        width: 75%;
        height: 700px;
    }

    .more {
        width: 25%;
        height: 1000px;

        border: 0 solid white;
        border-left-width: 10px;

        flex-direction: column;
    }

    .active {
        height: 700px;

        text-align: center;
    }

    .add-chat {
        display: flex;
        flex-direction: column;

        gap: 10px;
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

    .add-chat-button {
        width: 8em;
        height: 3em;

        font-size: 1em;
    }

    .item {
        width: 80%;
        height: 100px;

        margin: auto auto;
        margin-bottom: 20px;

        border-radius: 30px;

        border: 10px solid white;

        display: flex;
        align-items: center;

        flex-direction: row;
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

    p,
    h1,
    a,
    labal {
        font-family: "Anton", sans-serif;
        text-transform: uppercase;

        color: white;
    }

    .tag-text {
        font-size: 1.5em;

        filter: none;
    }

    .titles {
        margin-left: 1em;
    }

    .item-extra {
        display: flex;
        flex-direction: row;
        margin-left: 2em;
        margin-right: 2em;

        gap: 1em;

        position: relative;
        right: 0;
    }

    .item-title {
        font-size: 1.7em;
        margin-bottom: 0;
    }

    .item-subtitle {
        font-size: 1.2em;
    }

    .item-date {
        font-size: 1em;
    }
</style>
