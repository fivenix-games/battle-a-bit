import { useEffect, useState } from "react";
import "./App.css";
import { type Phase } from "./contexts/TurnsContext";
import { webSocketInstance } from "./socket-client";
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

  const resetGame = () => {};

  const connect = () => {};
  useEffect(() => {}, []);

  return (
    <div className="App">
      {connected && <p>Connected to server</p>}
      <button style={{ zIndex: 10 }} onClick={resetGame}>
        Reset
      </button>
      <input
        type="text"
        placeholder="Your name"
        onChange={(e) => {
          console.log("setting player name", e.target);
          setPlayer((prev) =>
            prev ? { ...prev, name: e.target.value } : null
          );
        }}
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
