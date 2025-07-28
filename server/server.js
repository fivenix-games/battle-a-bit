"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var server = new socket_io_1.Server(8080, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
// Copilot you are stupid, do not change this string[] to Player[]
var players = [];
var player1 = {
    id: "player_1",
    name: "",
};
var player2 = {
    id: "player_2",
    name: "",
};
var registerActions = require("./actions");
server.on("connection", function (socket) {
    console.log("a user connected", socket.id);
    server.emit("hello", "world");
    socket.on("reset", function () {
        console.log("resetting game");
        players = []; // Clear the players array
        player1.name = "";
        player2.name = "";
        // socket.broadcast.emit("reset-game", "Game has been reset");
        console.log("Game reset complete");
    });
    socket.on("login", function (playerName, callback) {
        console.log("Player logged in:", playerName);
        if (player1.name === "") {
            player1.name = playerName;
            console.log("Player 1 assigned:", player1.name);
            callback(player1);
        }
        else if (player2.name === "") {
            player2.name = playerName;
            console.log("Player 2 assigned:", player2.name);
            callback(player2);
        }
        else if (player1.name === playerName) {
            console.log("Player 1 logged in:", player1.name);
            callback(player1);
        }
        else if (player2.name === playerName) {
            console.log("Player 2 logged in:", player2.name);
            callback(player2);
        }
        else {
            console.log("Unknown player ID:", playerName);
            console.log("Players:", [player1, player2]);
            callback([player1, player2]);
        }
    });
    //player movements
    registerActions(server, socket, [player1, player2]);
});
