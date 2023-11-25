import { Armor } from "./Armors";
import { Expansion } from "./Expansions";
import { Weapon } from "./Weapons";

export type Trait = {
  id: number;
  name: string;
  requires?: boolean;
  value?: boolean;
  bookPage?: number;
  expansionId?: number;
  book?: Expansion;
}

export type TraitValue = {
  id: number;
  value?: number;
  weaponId?: number;
  armorId?: number;
  weapon?: Weapon;
  armor?: Armor;
}
