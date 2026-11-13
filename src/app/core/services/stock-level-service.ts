import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StockLevelModel } from '../models/stock-level-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockLevelService {

   apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllStockChecks(): Observable<StockLevelModel[]> {
    const getUrl = `${this.apiUrl}/stock-checks/getAllStockChecks`;

    return this.httpClient.get<StockLevelModel[]>(getUrl);
  }

  getByWarehouse(warehouseId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/stock-checks/warehouse/${warehouseId}`);
  }

  getByProduct(productId: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/product/${productId}`);
  }

  getLowStock(threshold: number = 10): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/low-stock?threshold=${threshold}`);
  }
}
