import { Socket } from "socket.io";
import { IOType, RoomsType } from "..";

export default function requestRejoinGame(
  socket: Socket,
  rooms: RoomsType,
  io: IOType
) {
  return socket.on(
    "request-rejoin-game",
    ({ roomId, playerName }: { roomId: string; playerName: string }) => {
      const room = rooms[roomId];
      if (room && room.players.includes(playerName)) {
        socket.join(roomId);
        io.to(roomId).emit("room-ready", {
          roomId,
          players: room.players,
        });
        console.log(`Player ${playerName} rejoined room ${roomId}`);
      }
    }
  );
}
