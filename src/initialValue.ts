import type { BuildingsType, PlanesType, TileType } from "./types";

export const gridInit: TileType[] = [
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
  {
    selected: false,
  },
];

export const BuildingsInit: {
  [name in BuildingsType]: {
    maxHp: number;
    damagePerBullet: number;
  };
} = {
  Command: {
    maxHp: 5,
    damagePerBullet: 0.5,
  },
  Radar: {
    maxHp: 2,
    damagePerBullet: 0.5,
  },
  Hangar: {
    maxHp: 3,
    damagePerBullet: 0.5,
  },
  Shield: {
    maxHp: 3,
    damagePerBullet: 0.5,
  },
  Power: {
    maxHp: 4,
    damagePerBullet: 0.5,
  },
  Turret: {
    maxHp: 2,
    damagePerBullet: 0.5,
  },
};

export const PlanesInit: {
  [name in PlanesType]: {
    damagePerBullet: number;
  };
} = {
  Fighter: {
    damagePerBullet: 1,
  },
  Bomber: {
    damagePerBullet: 0.8,
  },
  Scout: {
    damagePerBullet: 0.5,
  },
};
