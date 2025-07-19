export type PlanesType = "Fighter" | "Bomber" | "Scout";
export type AttackType = {
  [name in PlanesType]: {
    tile?: number;
    attacked: boolean;
  };
};
export type PlanesActions =
  // | {
  //     type: "flip";
  //     index: number;
  //   }
  | {
      type: "reset";
      index?: number;
    }
  | { type: "attack"; index: number; attackingPlane: PlanesType };

export type TileType = {
  noMansLand?: boolean;
  selected: boolean;
  hasBuilding?: boolean;
  hasTurret?: boolean;
  visible?: boolean;
  attacked?: boolean;
  valid?: boolean;
  hp?: number;
  building?: BuildingsType;
  attackingPlane?: PlanesType;
};

export type BuildingsType =
  | "Command"
  | "Radar"
  | "Hangar"
  | "Shield"
  | "Power"
  | "Turret";
export type Player = 1 | 2;
