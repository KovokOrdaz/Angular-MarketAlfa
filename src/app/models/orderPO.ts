import { ConceptOrder } from "./conceptOrder";

export interface OrderPO
{
    distributor: number;
    receive: string;
    concepts: ConceptOrder;
}