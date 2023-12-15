import { Armor } from "./Armors";
import { Weapon } from "./Weapons";

export interface UnitType {
  id: number;
  name: string;
}

export type Unit = {
  id: number;
  name: string;
  unitType: number;
  type: UnitType,
  combat?: number;
  ranged?: number;
  grit?: number;
  defaultWeapon?: number;
  defaultBody?: number;
  defaultBarding?: number;
  defaultShield?: number;
  weapon: Weapon,
  body: Armor,
  shield: Armor,
  barding: Armor,
  cost: number;
  fixedFigures?: number;
  fixedSave?: number;
  fixedCost?: number;
  notForBreak?: boolean;
  countsDouble?: boolean;
  noCountForBreak?: boolean;
  isLeader?: boolean;
  noStats?: boolean;
  zeroFigures?: boolean;
  freeUnits?: number;
  commandRange?: number;
  commandPoints?: number;
  armies?: number[];
  traits?: number[];
  options?: number[];
}
