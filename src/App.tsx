import { useEffect, useState } from "react";
import "./App.css";
import { TurnsContext, type Phase } from "./contexts/TurnsContext";
import { webSocketInstance as ws } from "./socket-client";
import Game from "./Game";
function App() {
  const [name, setName] = useState<string | undefined>();
  const [players, setPlayers] = useState<string[] | null>();
  const [log, setLog] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const [showGame, setShowGame] = useState(false);
  const playerAssigned = (data) => {
    console.log("Player assigned:", data);
  };

  const resetGame = () => {};

  const connect = () => {
    console.assert(name, "name is not populated, cannot connect");
    sessionStorage.setItem("player-name", name!);
    console.log(name);
    ws.emit("player:connect", name, console.log);
  };

  ws.on("player:list", (players: string[]) => {
    console.log("player list", players);
    setPlayers(players);
  });

  ws.on("ready", () => {
    console.log("lobby ready...");
    setShowGame(true);
  });
  useEffect(() => {
    setName(sessionStorage.getItem("player-name") || "");
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
        value={name}
        onChange={(e) => {
          console.log("setting player name", e.target);
          setName(e.target.value);
        }}
      />
      <button onClick={() => connect()}>Connect</button>
      <h1>Battle-a-bit</h1>
      <div>
        <TurnsContext.Provider value={{ phase, setPhase }}>
          {showGame && <Game />}
        </TurnsContext.Provider>
      </div>
      {players && <p>List of Players: {players.map((name) => name)}</p>}
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
