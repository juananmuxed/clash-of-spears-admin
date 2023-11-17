import { Expansion } from "./Expansions";

export type WeaponType = {
  id: number;
  name: string;
}

export type Weapon = {
  id: number;
  name: string;
  rangeShort?: number;
  rangeLong?: number;
  saveModification?: number;
  initiative?: number;
  bookPage: number;
  expansionId: number;
  book?: Expansion;
  types: WeaponType[];
}
