import { Server, Socket } from "socket.io";

const server = new Server(8080, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const currentPlayers: Map<string, Player> = new Map();

let isLobbyReady = false;

let playerCount = 0;

class Player {
  name: string | undefined;
  ws: Socket | undefined;
  constructor(name: string, ws: Socket) {
    this.name = name;
    this.ws = ws;
  }
}

server.on("connection", (client) => {
  client.emit("connect:success");

  client.on("player:connect", (name: string, callback: Function) => {
    if (!isLobbyReady) {
      if (!currentPlayers.get(name)) {
        currentPlayers.set(name, new Player(name, client));
        console.log("player connected", name);
        callback("new");
        playerCount++;
      } else {
        console.log("player exists", currentPlayers.get(name)?.name);
        callback("exists");
      }
    }
    server.emit(
      "player:list",
      Array.from(currentPlayers, ([key, player]) => player?.name || "")
    );
    if (playerCount === 2) {
      isLobbyReady = true;
      callback("full");
      server.emit("ready");
    }
  });
});
