<script lang="ts">
    import { enhance } from "$app/forms";

    export let data;

    let cart = data.cart?.split(";");
    cart?.pop();
</script>

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main>
    <div id="content">
        <div class="block">
            <div
                class="image"
                style="background-image: url({data.game.image});"
            />
            <div class="text">
                <p class="title">{data.game.title}</p>
                <p>{data.game.description}</p>
                {#if cart?.indexOf(data.game.id.toString()) == -1}
                    <form use:enhance method="POST" action="?/cart">
                        <input type="hidden" name="item" value={data.game.id} />

                        <button
                            class="cart shop"
                            on:click={() => {
                                setTimeout(() => {
                                    location.reload();
                                }, 100);
                            }}
                            >Cart<i
                                class="fa fa-shopping-cart"
                                style="color: white; font-size: 34px;"
                            /></button
                        >
                    </form>
                {:else}
                    <button class="cart shopped"
                        >Shopped<i
                            class="fa fa-shopping-cart"
                            style="color: white; font-size: 34px;"
                        /></button
                    >
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");

    :global(body) {
        margin: 0;

        overflow-y: hidden;
    }

    main {
        background-image: linear-gradient(
            rgba(36, 36, 36, 1),
            rgba(14, 14, 14, 1)
        );

        height: 100em;

        display: flex;
        flex-direction: column;
    }

    .cart {
        width: 6em;
        height: 2em;
        font-size: 24px;
        text-transform: uppercase;
        font-family: "Anton", sans-serif;

        color: white;

        border: 0 solid white;
        border-radius: 0.5em;
    }

    .shop {
        background-image: linear-gradient(rgb(0, 162, 255), rgb(0, 145, 255));

        cursor: pointer;
    }

    .shopped {
        background-color: gray;
    }

    #content {
        width: 100%;
        height: 10em;

        gap: 100px;

        margin-top: 3em;

        margin-bottom: 20px;
        display: flex;

        filter: drop-shadow(0 0 0.75rem black);
    }

    .block {
        margin: auto auto;
        margin-top: 5em;

        width: 90%;
        display: flex;
        justify-content: center;

        padding: 2em 0;
        border-radius: 5em;

        background-color: rgb(10, 10, 10);
    }

    .image {
        width: 60%;
        height: 32em;

        background-size: cover;
        background-repeat: no-repeat;
    }

    p {
        color: white;
    }

    .text {
        flex-direction: column;
        margin-left: 1em;
    }

    .title {
        font-family: "Anton", sans-serif;
        text-transform: uppercase;

        font-size: 4em;
    }
</style>
