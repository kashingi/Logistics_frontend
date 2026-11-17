import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockCheckCreateRequest } from '../models/stock-check-model';

@Injectable({
  providedIn: 'root',
})
export class StockCheckService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createStockCheck(data: StockCheckCreateRequest): Observable<StockCheckCreateRequest> {
    const createUrl = `${this.apiUrl}/stock-checks/addStockCheck`;

    return this.httpClient.post<StockCheckCreateRequest>(createUrl, data);
  }

  getAllStockChecks(): Observable<StockCheckCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-checks/getAllStockChecks`;

    return this.httpClient.get<StockCheckCreateRequest[]>(getUrl);
  }

  getStockCheckById(id: number): Observable<StockCheckCreateRequest> {
    const getUrl = `${this.apiUrl}/stock-checks/getStockCheckById/${id}`;

    return this.httpClient.get<StockCheckCreateRequest>(getUrl);
  }

  getStockCheckByStatus(status: string): Observable<StockCheckCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-checks/getStockChecksByStatus/${status}`;

    return this.httpClient.get<StockCheckCreateRequest[]>(getUrl);
  }

  approveStockCheck(id: number): Observable<any> {
    const approveUrl = `${this.apiUrl}/stock-checks/approveStockCheck/${id}`;

    return this.httpClient.patch(approveUrl, {});
  }

  completeStockCheck(id: number): Observable<any> {
    const approveUrl = `${this.apiUrl}/stock-checks/completeStockCheck/${id}`;

    return this.httpClient.patch(approveUrl, {});
  }

  cancelStockCheck(id: number): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/cancel/${id}`, {});
  }
}
