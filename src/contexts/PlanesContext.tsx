import React from "react";
import type { AttackType, PlanesType } from "../types";

export const PlanesContext = React.createContext<{
  selectedPlane: PlanesType | null;
  setSelectedPlane: React.Dispatch<React.SetStateAction<PlanesType | null>>;
  attacked: AttackType;
  setAttacked: React.Dispatch<React.SetStateAction<AttackType>>;
} | null>(null);
