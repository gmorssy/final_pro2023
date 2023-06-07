<nav>
    <div class="align">
        <a href="/">home</a>
        <a href="/store">store</a>
        <a href="/forums">forums</a>
        <a href="/login">login</a>
    </div>
</nav>

<slot />

<style>
    nav {
        position: fixed;
        width: 100%;

        background-color: rgb(20, 20, 20);
        padding: 10px 0;
        display: flex;

        border: 0 solid white;
        border-bottom-color: white;
        border-bottom-width: 0.5em;

        gap: 3em;

        z-index: 10;
    }

    .align {
        margin: auto auto;
    }

    a {
        margin-right: 4em;
        margin-left: 4em;

        text-transform: uppercase;
        font-family: "Anton", sans-serif;
        font-size: 2em;
        color: white;
        text-decoration: none;

        transition: all 0.4s;
    }

    a:hover {
        color: aqua;
    }
</style>
