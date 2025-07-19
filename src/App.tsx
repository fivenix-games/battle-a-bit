import { useEffect, useState } from "react";
import "./App.css";
import { type Phase } from "./contexts/TurnsContext";
import { webSocketInstance } from "./socket";
function App() {
  type Player = {
    id: string;
    name: string;
  };

  const [player, setPlayer] = useState<Player | null>();
  const [log, setLog] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const playerAssigned = (data) => {
    console.log("Player assigned:", data);
  };

  const resetGame = () => {
    webSocketInstance.emit("reset");
    setPlayer(null);
    setLog([]);
    setPhase(null);
  };

  const connect = () => {
    console.log("Logging in...");
    webSocketInstance.emit(
      "login",
      player?.name || "",
      (loggedInPlayer: Array<Player> | Player) => {
        if (!(loggedInPlayer instanceof Array)) {
          setPlayer(loggedInPlayer);
        } else {
          console.log("Login failed");
          console.error("available players:", loggedInPlayer);
        }
      }
    );
  };
  useEffect(() => {
    webSocketInstance.on("connect", () => {
      setConnected(true);
      console.log("Connected to server with ID:", webSocketInstance.id);
    });

    webSocketInstance.on("player-assigned", playerAssigned);

    webSocketInstance.on("reset-game", () => {
      console.log("Game has been reset");
      resetGame();
      sessionStorage.setItem("playerId", "");
    });
  }, []);

  return (
    <div className="App">
      {connected && <p>Connected to server</p>}
      <button style={{ zIndex: 10 }} onClick={resetGame}>
        Reset
      </button>
      <input
        type="text"
        placeholder="Your name"
        onChange={(e) =>
          setPlayer((prev) => (prev ? { ...prev, name: e.target.value } : null))
        }
      />
      <button onClick={() => connect()}>Connect</button>
      <h1>Battle-a-bit</h1>
      {/* <TurnsContext.Provider value={{ phase, setPhase }}>
        <Game />
      </TurnsContext.Provider> */}
      {player && <p>You are Player {player.name}</p>}
      {/* {player && <Game />} */}
      <div style={{ marginTop: 20 }}>
        <h3>Opponent Moves</h3>
        <div>
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
