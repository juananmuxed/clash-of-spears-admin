import { Armor } from "./Armors";
import { Weapon } from "./Weapons";

export type Option = {
  id: number;
  name: string;
  cost: number;
  fixedCost?: number;
  fixedUnits?: number;
  weapon?: Weapon;
  shield?: Armor;
  body?: Armor;
  barding?: Armor;
  armies?: number[];
  incompatibleShields?: number[];
  neededWeapons?: number[];
  incompatibleWeapons?: number[];
  upgradeTraits?: number[];
  neededTraits?: number[];
  removeTraits?: number[];
  incompatibleTraits?: number[];
  upgradeWeapon?: number;
  upgradeBody?: number;
  upgradeShield?: number;
  upgradeBarding?: number;
}
