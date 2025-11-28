import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import requestJoinGame from "./listeners/request-join-game";
import requestRejoinGame from "./listeners/request-rejoin-game";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export type IOType = typeof io;

export type RoomsType = {
  [roomId: string]: {
    players: string[];
    playerCount: number;
  };
};

const rooms: RoomsType = {};

app.get("/", (req, res) => {
  res.send("<h1>Hello from Socket.io Server</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  console.log("alloting room...");

  requestJoinGame(socket, rooms, io);
  requestRejoinGame(socket, rooms, io);
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
