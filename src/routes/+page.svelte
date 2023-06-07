<script lang="ts">
    import { fade } from "svelte/transition";

    export let data;

    let fadeIn = true;

    setTimeout(() => {
        fadeIn = false;
    }, 10);
</script>

<main>
    <div id="content">
        {#each data.games as news}
            <div id="card" style="background-image: url('{news.image}');">
                <div id="info">
                    <p id="title">{news.title}</p>
                    <p id="subtitle">{news.subtitle}</p>
                    {#if news.button != ""}
                        <a href="/store/{news.id}">
                            <button id="button">{news.button}</button>
                        </a>
                    {:else}
                        <a href="/store/{news.id}">
                            <button id="button">CHECK OUT</button>
                        </a>
                    {/if}
                </div>
                <svg>
                    <polygon points="0,0 100,0 0,700" fill="rgb(10,10,10)" />
                </svg>
            </div>
        {/each}
    </div>
    {#if fadeIn}
        <div id="fade-in" out:fade={{ duration: 500 }} />
    {/if}
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");

    :global(body) {
        margin: 0;
    }

    main {
        background-image: linear-gradient(
            rgba(36, 36, 36, 1),
            rgba(14, 14, 14, 1)
        );

        display: flex;
        flex-direction: column;
    }

    #content {
        width: 100%;

        gap: 100px;
        margin: auto auto;

        margin-bottom: 20px;

        filter: drop-shadow(0 0 0.75rem black);
    }

    #info {
        width: 40%;
        height: 100%;
        background-color: rgb(10, 10, 10);

        text-align: center;
        font-family: "Anton", sans-serif;
        color: white;
    }

    #title {
        font-size: 56px;
        text-transform: uppercase;

        margin-top: 150px;
        margin-bottom: 0px;
    }

    #subtitle {
        font-size: 24px;
        color: white;

        margin-bottom: 50px;
    }

    #card {
        height: 700px;

        background-repeat: no-repeat;
        background-size: cover;

        margin-top: 20px;
        margin-bottom: 20px;

        display: flex;
        flex-direction: row;
        box-shadow: 0 0 200px rgba(0, 0, 0, 0.9) inset;
    }

    #button {
        width: 200px;
        height: 70px;

        border-radius: 50px;

        color: white;
        font-weight: bold;
        font-size: 18px;

        border: 10px solid;
        border-image-slice: 1;
        border-radius: 30px;
        border-width: 5px;

        border-color: white;
        background-color: transparent;

        cursor: pointer;

        transition: all 0.2s;
    }

    #button:hover {
        background-color: white;
        color: black;
    }

    #fade-in {
        position: fixed;
        width: 200vh;
        height: 100vh;

        z-index: 10;

        background-color: black;
    }
</style>
