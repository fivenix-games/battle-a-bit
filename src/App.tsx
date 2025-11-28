import { Fragment, useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
  const [loading, setLoading] = useState(true);
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [player, setPlayer] = useState(
    sessionStorage.getItem("playerName") || ""
  );
  useEffect(() => {
    socket.on("connect", () => {
      setLoading(false);
      console.log("connected to server with id:", socket.id);
      const storedPlayerName = sessionStorage.getItem("playerName");
      if (storedPlayerName) {
        const roomId = sessionStorage.getItem("roomId");
        console.log("rejoining game as", storedPlayerName);
        setLoading(true);
        socket.emit("request-rejoin-game", {
          roomId,
          playerName: storedPlayerName,
        });
      }
    });

    socket.on(
      "room-ready",
      ({ roomId, players }: { roomId: string; players: string[] }) => {
        setLoading(false);
        setIsRoomReady(true);
        sessionStorage.setItem("roomId", roomId);
        console.log("Room is ready!", roomId, players);
      }
    );

    socket.on("error", (message: string) => {
      setLoading(false);
      console.error("Error from server:", message);
    });

    socket.on("start-game", (players: string[]) => {
      setLoading(false);
      console.log("game started with players:", players);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const handleJoinGame = (playerName: string) => {
    setPlayer(playerName);
    sessionStorage.setItem("playerName", playerName);
    setLoading(true);
    if (socket.connected) {
      socket.emit("request-join-game", playerName);
    }
    console.log("joining game");
  };

  const handleReset = () => {
    setPlayer("");
    setIsRoomReady(false);
    sessionStorage.removeItem("playerName");
    sessionStorage.removeItem("roomId");
    window.location.reload();
  };
  return (
    <div className="App">
      {player && (
        <Fragment>
          <h3>Player: {player}</h3>
          <button onClick={handleReset}>Reset</button>
        </Fragment>
      )}
      {!isRoomReady && (
        <WelcomeScreen handleJoinGame={handleJoinGame} loading={loading} />
      )}
      {isRoomReady && <GameScreen />}
    </div>
  );
}

const WelcomeScreen: React.FC<{
  handleJoinGame: (playerName: string) => void;
  loading: boolean;
}> = ({ handleJoinGame, loading }) => {
  const [playerName, setPlayerName] = useState("");
  return (
    <div>
      <h2>Welcome to Battle a Bit!</h2>
      <h4>Enter Name</h4>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        disabled={loading}
      />
      <button disabled={loading} onClick={() => handleJoinGame(playerName)}>
        Join Game
      </button>
    </div>
  );
};

const GameScreen: React.FC = () => {
  return (
    <div>
      <h2>Game Screen</h2>
      <h3>Room is ready! Waiting for game to start...</h3>
      {/* Game UI goes here */}
    </div>
  );
};
export default App;
