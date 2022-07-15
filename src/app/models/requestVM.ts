import { ConceptRequest } from "./conceptResquest";

export interface RequestVM {
  user: number;
  distributor: string;
  orderD: number;
  code: string;
  products: ConceptRequest[];
}
