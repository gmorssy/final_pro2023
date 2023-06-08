<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade } from "svelte/transition";

    export let data;

    let games = data.games;

    let cart = data.cart?.split(";");
    cart?.pop();

    function totalCart(cart: string[]) {
        if (cart.length > 10) {
            return "9+";
        } else {
            return cart.length;
        }
    }

    $: {
        games = filter(filterValue);
    }

    let filterValue: string = "";

    function filter(filter: string) {
        let letters = filter.split("");
        let newGames = [];

        for (let i = 0; i < data.games.length; i++) {
            newGames.push(data.games[i]);
        }

        for (let i = 0; i < newGames.length; i++) {
            for (let j = 0; j < letters.length; j++) {
                if (
                    newGames[i]?.title[j].toLocaleLowerCase() !=
                    letters[j].toLocaleLowerCase()
                ) {
                    newGames.splice(i, 1);
                }
            }
        }

        return newGames;
    }

    let showCart: boolean = false;
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main>
    <div id="menu">
        <div id="middle">
            <input
                type="text"
                id="filter"
                placeholder="Filter"
                bind:value={filterValue}
            />

            {#if !showCart && data.session}
                <button
                    class="add-button cart-button"
                    style="margin-top: 10px;"
                    on:click={() => {
                        showCart = !showCart;
                    }}
                    ><i
                        class="fa fa-shopping-cart"
                        style="color: white; font-size: 34px;"
                    >
                        {#if cart}
                            <p class="cart-number">
                                {totalCart(cart)}
                            </p>
                        {/if}
                    </i>
                </button>
            {/if}

            {#if showCart && data.session}
                <div class="cart-menu">
                    <button
                        class="add-button cart-button"
                        on:click={() => {
                            showCart = !showCart;
                        }}
                    >
                        <i
                            class="fa fa-shopping-cart"
                            style="color: white; font-size: 34px;"
                        >
                            {#if cart}
                                <p class="cart-number">
                                    {totalCart(cart)}
                                </p>
                            {/if}
                        </i>
                    </button>
                    {#if cart}
                        {#each cart as item}
                            <a href="/store/{item}">
                                {data.games.find((e) => e.id.toString() == item)
                                    ?.title}
                            </a>
                            <div class="line" />
                        {/each}
                    {/if}
                </div>
            {/if}
        </div>
    </div>
    <div id="content">
        {#each games as game}
            <div
                class="card"
                style="background-image: url('{game.image}')"
                on:mouseenter={() => {
                    game.showMore = true;
                }}
                on:mouseleave={() => {
                    game.showMore = false;
                }}
            >
                {#if game.showMore}
                    <a
                        href="/store/{game.id}"
                        class="title"
                        in:fade={{ duration: 200 }}
                        out:fade={{ duration: 200 }}>{game.title}</a
                    >
                    <form use:enhance method="POST" action="?/cart">
                        <input type="hidden" name="item" value={game.id} />
                        <button
                            on:click={() => {
                                setTimeout(() => {
                                    location.reload();
                                }, 100);
                            }}
                            class="cart"
                            in:fade={{ duration: 200 }}
                            out:fade={{ duration: 200 }}
                        >
                            <i
                                class="fa fa-shopping-cart"
                                style="color: white;"
                            /></button
                        >
                    </form>
                {/if}
            </div>
        {/each}
        {#each Array(16 - data.games.length) as empty}
            <div class="empty" />
        {/each}
    </div>
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

        display: grid;
    }

    p,
    a {
        text-transform: uppercase;
        font-family: "Anton", sans-serif;
    }

    #content {
        display: grid;
        grid-template-columns: auto auto auto auto;

        margin: auto auto;
        margin-bottom: 50px;
        margin-top: 180px;

        gap: 50px;
    }

    #menu {
        width: 60%;
        height: 70px;

        margin: auto auto;
        margin-top: 76px;

        background-image: linear-gradient(
            rgba(58, 58, 58, 1),
            rgba(61, 61, 61, 1)
        );

        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;

        display: flex;
        flex-direction: row;

        position: fixed;
        z-index: 10;
        left: 20%;

        filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.156));
    }

    #middle {
        margin: auto auto;
        width: 80%;

        display: flex;
        flex-direction: row;
    }

    #filter {
        width: 300px;
        height: 40px;

        border-radius: 30px;
        border-width: 0;
        padding-left: 10px;
        font-family: "Anton", sans-serif;

        margin-top: 10px;
    }

    .add-button {
        width: 50px;
        height: 50px;

        border-radius: 50px;
        border-width: 0;

        filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.156));

        cursor: pointer;
    }

    .cart-button {
        background-image: linear-gradient(rgb(0, 162, 255), rgb(0, 145, 255));
    }

    .cart-menu {
        width: 200px;
        height: 200px;
        background-color: gray;
        margin-top: 10px;
        border-radius: 30px;

        filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.156));
    }

    .cart-number {
        position: fixed;
        top: 1px;
        left: 22px;
        color: black;
        font-size: 14px;
        text-align: center;
    }

    .card {
        width: 300px;
        height: 180px;

        background-size: contain;
        background-repeat: no-repeat;
        background-size: cover;

        filter: drop-shadow(0 0 5px rgb(96, 96, 96));

        transition: all 0.2s;
    }

    .card:hover {
        transform: scale(1.2);
    }

    .cart {
        position: absolute;
        bottom: 15px;
        left: 10px;

        width: 40px;
        height: 40px;

        border: 10px solid;
        border-width: 5px;
        border-color: white;

        border-radius: 50%;

        background-color: transparent;

        cursor: pointer;
    }

    .empty {
        width: 300px;
        height: 180px;

        background-color: rgb(15, 15, 15);
    }

    .title {
        text-align: right;
        font-size: 1.6em;
        color: white;

        margin-right: 10px;
        margin-top: 120px;
    }

    .line {
        height: 1px;
        background-color: black;
    }
</style>
