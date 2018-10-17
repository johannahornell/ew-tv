<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <title>API</title>
</head>

<body>
    <button class="btn" id="btn">Click me</button>
    <button id="btnrev">
        click
    </button>
    <button href="http://localhost:8888/login" class="btnMusic" id="btn-login">Current Music Login</button>
    <div id="btn-refToken">
        <button href="" class="btnMusic" id="btn-refToken">Refresh Access-Token</button>
    </div>
    <hr>
    <div id="access_token"></div>
    <hr>
    <div id="refresh_token"></div>
    <h2>Spotify</h2>
    <h3 id="artist"></h3>
    <h3 id="title"></h3>
    <p id="songTime"></p>
    <hr>
    <div class="container">

        <ul class="missions">
            <h4>Missions</h4>
        </ul>
        <hr>
        <ul class="quests">
            <h4>Quests</h4>
        </ul>
        <hr>
        <ul class="late"></ul>
        <ul class="logged-in"></ul>
        <ul class="stats"></ul>
        <ul class="tickets"></ul>
        <div class="list"></div>
        <button id="hej">hej</button>
    </div>
</body>

<script src="./index.js" type="text/javascript"></script>
<script src="./spotApp.js" type="text/javascript"></script>

</html>