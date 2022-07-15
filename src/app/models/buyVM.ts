import { ConceptBuy } from "./conceptBuy";

export interface BuyVM
{
    client: string;
    seller: number;
    Concepts: ConceptBuy[];
}