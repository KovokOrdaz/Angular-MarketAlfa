import { ConceptOrder } from "./conceptOrder";

export interface Order {
  user: number;
  distributor: string;
  receive: string;
  concepts: ConceptOrder[];
}
