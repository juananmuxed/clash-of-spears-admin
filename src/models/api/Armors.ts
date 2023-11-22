import { Expansion } from "./Expansions";

export type Armor = {
  id: number;
  name: string;
  value?: number;
  special?: boolean;
  bookPage?: number;
  expansionId?: number;
  book?: Expansion;
}
