import { Expansion } from "./Expansions";

export type Trait = {
  id: number;
  name: string;
  requires?: boolean;
  value?: boolean;
  bookPage?: number;
  expansionId?: number;
  book?: Expansion;
}
