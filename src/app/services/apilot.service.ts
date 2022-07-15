import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models';
import { InactiveElement } from '../models/inactiveElement';
import { InventoryProductReason } from '../models/inventoryProductReason';

const httpOption = { headers: new HttpHeaders({ 'Contend-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ApilotService {
  url: string = "https://localhost:7241/inventorylot";
  constructor(private _Http: HttpClient) { }

  read(): Observable<Result> {
    return this._Http.get<Result>(this.url);
  }

  readInactive(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventorylot/inactive");
  }

  readReason(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventorylot/reason");
  }

  readEmpty(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventorylot/empty");
  }

  readLow(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventorylot/low");
  }

  readLotProduct(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventorylot/lotproduct");
  }

  readProductReason(): Observable<Result> {
    return this._Http.get<Result>("https://localhost:7241/inventorylot/productreason");
  }
  deleteProduct(entity: InventoryProductReason): Observable<Result> {
    return this._Http.put<Result>("https://localhost:7241/inventorylot/deleteproduct", entity, httpOption);
  }

  delete(entity: InactiveElement): Observable<Result> {
    return this._Http.put<Result>(this.url, entity, httpOption);
  }

  deleteX(entity: any): Observable<Result> {
    return this._Http.delete<Result>(`${this.url}/${entity.id}`);
  }
}
