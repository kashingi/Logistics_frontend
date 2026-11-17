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

  getAllStockLevels(): Observable<StockLevelModel[]> {
    const getUrl = `${this.apiUrl}/stocks/getAllStockLevels`;

    return this.httpClient.get<StockLevelModel[]>(getUrl);
  }

  getStockByWarehouse(warehouseId: number): Observable<StockLevelModel[]> {
    const byWarehouseUrl = `${this.apiUrl}/stocks/getStockByWarehouse/${warehouseId}`;

    return this.httpClient.get<StockLevelModel[]>(byWarehouseUrl);
  }

  getStockByProduct(productId: number): Observable<StockLevelModel[]> {
    const byProductUrl = `${this.apiUrl}/getStockByProductId/${productId}`;

    return this.httpClient.get<StockLevelModel[]>(byProductUrl);
  }

  getLowStock(threshold: number = 10): Observable<any> {
    const lowUrl = `${this.apiUrl}/low-stock?threshold=${threshold}`;

    return this.httpClient.get(lowUrl);
  }
}
