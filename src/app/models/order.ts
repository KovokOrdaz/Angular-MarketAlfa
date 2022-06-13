import { ConceptOrder } from "./conceptOrder";

export interface Order
{
    distributor: number;
    receive: string;
    concepts: ConceptOrder[];
}