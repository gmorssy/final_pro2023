<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData, PageData } from "./$types";

    export let data: PageData;
    export let form: ActionData;

    let chat = [
        { text: "I want pizza", from: "1" },
        { text: "Me too", from: "2" },
        { text: "I also want pizza", from: "2" },
        { text: "Give me NOW!!", from: "1" },
    ];
</script>

<main>
    <div class="items">
        {#each Array(3) as item}
            <div class="item">
                <!--<div class="tag guide">
                    <p class="tag-text">guide</p>
                </div>
                <div class="tag idea">
                    <p class="tag-text">idea</p>
                </div>-->
                <div class="tag general">
                    <p class="tag-text">general</p>
                </div>
                <div class="titles">
                    <p class="item-title">how to get infinite money in</p>
                    <p class="item-subtitle">videogame game</p>
                </div>
                <div class="item-extra">
                    <p class="item-date">By: hello23</p>
                    <p class="item-date">2004-04-14</p>
                </div>
            </div>
        {/each}
    </div>
    <div class="more">
        <div class="active">
            <h1 class="active-title">Active people:</h1>
            {#each Array(9) as player}
                <p class="active-player">hello2</p>
                <i
                    class="fa fa-envelope"
                    style="font-size:24px; color: white;"
                />
            {/each}
            <p class="active-player">and 99+ more</p>
        </div>
        <div class="chat">
            <div class="chat-box">
                <h1 class="chat-title">You're chatting with: hello2</h1>
                {#each chat as words}
                    {#if words.from == "1"}
                        <div class="chat-text">
                            <p class="chat-away">{words.text}</p>
                        </div>
                    {:else}
                        <div class="chat-text">
                            <p class="chat-you">{words.text}</p>
                        </div>
                    {/if}
                {/each}
                <form class="chat-send">
                    <input type="text" />
                    <button>▸</button>
                </form>
            </div>
        </div>
    </div>

    <div style="display: flex; flex-direction:column">
        <h1>Chats</h1>

        <hr />
        {#each data.chats as chat}
            <h1>hel</h1>
            <h1>he</h1>

            <div style="display:flex;">
                <p><a href={"/chat/" + chat.id}>{chat.name}</a></p>
                {#if data.favoriteChats.includes(chat.id)}
                    <form action="?/unfavorite" method="post">
                        <input type="hidden" name="chatId" value={chat.id} />
                        <button type="submit">unfavorite</button>
                    </form>
                {:else}
                    <form action="?/favorite" method="post">
                        <input type="hidden" name="chatId" value={chat.id} />
                        <button type="submit">favorite</button>
                    </form>
                {/if}
            </div>
        {/each}
    </div>

    <hr />

    <form use:enhance={(e) => e.form.reset()} method="post" action="?/add">
        <h1>a</h1>
        <h1>a</h1>
        <input type="text" name="chatname" placeholder="chat name" id="" />
        <button type="submit">add forum</button>
        {#if form?.error}
            {form.error}
        {/if}
    </form>
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
    }

    main {
        display: flex;
        flex-direction: row;
    }

    .items {
        width: 75%;
        height: 700px;
    }

    .more {
        width: 25%;
        height: 700px;

        border: 0 solid white;
        border-left-width: 10px;

        flex-direction: column;
    }

    .chat {
        display: flex;
        flex-direction: column;

        height: 350px;

        border: 0 solid white;
        border-top-width: 5px;
    }

    .chat-box {
        display: flex;
        flex-direction: column;

        gap: 0.5em;
    }

    .chat-title {
        text-align: center;
        font-size: 1.6em;
    }
    /*https://ishadeed.com/article/facebook-messenger-chat-component/*/
    .chat-away {
        margin: 0;
        margin-left: 1em;

        background: rgb(136, 136, 136);
        padding-left: 5px;
        display: inline;
        padding-right: 9px;
        clear: both;

        text-align: center;

        border-radius: 10px;
    }

    .chat-you {
        margin: 0;
        margin-right: 1em;

        background: rgb(0, 121, 255);
        padding-left: 5px;
        display: inline;
        padding-right: 9px;
        clear: both;

        position: relative;
        left: 60%;

        justify-self: center;

        border-radius: 10px;
    }

    .chat-send {
        display: flex;
        justify-content: center;
    }

    .active {
        height: 350px;

        border: 0 solid white;
        border-bottom-width: 5px;

        text-align: center;
    }

    .active-player {
        margin: 0;
        font-size: 1.1em;
    }

    .active-title {
        margin: 0;
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

        cursor: pointer;
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
    h1 {
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
