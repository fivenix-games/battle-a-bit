import type React from "react";

const Base: React.FC<{ playerName: "Player 1" | "Player 2" }> = (props) => {
  return <div className="base">{props.playerName}
  </div>;
};

export default Base;
