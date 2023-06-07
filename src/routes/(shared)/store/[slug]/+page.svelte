<script lang="ts">
    export let data;
</script>

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
            </div>
        </div>
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

        height: 100em;

        display: flex;
        flex-direction: column;
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
