import { Socket } from "socket.io";
import { IOType, RoomsType } from "..";

export default function requestJoinGame(
  socket: Socket,
  rooms: RoomsType,
  io: IOType
) {
  return socket.on("request-join-game", (playerName: string) => {
    if (!playerName || playerName.trim() === "") {
      socket.emit("error", "Invalid player name.");
      return;
    }

    console.log(`Player ${playerName} joined the game.`);
    const [key, availableRoom] =
      Object.entries(rooms).find(([, { playerCount }]) => {
        return playerCount < 2;
      }) || [];

    if (key && availableRoom) {
      if (availableRoom.players.includes(playerName)) {
        console.log(`player name ${playerName} already taken in room ${key}`);
        socket.emit("error", "Player name already taken in this room.");
        return;
      }
      availableRoom.players.push(playerName);
      availableRoom.playerCount += 1;
      socket.join(key);
      io.to(key).emit("room-ready", {
        roomId: key,
        players: availableRoom.players,
      });
      console.log(
        `added to existing room. ${key} players: ${availableRoom.players}`
      );
    } else {
      const roomId = `room-${Date.now()}`;
      rooms[roomId] = {
        players: [playerName],
        playerCount: 1,
      };
      socket.join(roomId);
      console.log(`created new room: ${roomId}`);
    }
  });
}
