import { createContext } from "react";

export type Phase = "attack" | "defence";

interface TurnsContextType {
  phase: Phase | null;
  setPhase: (phase: Phase | null) => void;
}

export const TurnsContext = createContext<TurnsContextType | null>(null);
