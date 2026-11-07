import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockOutCreateRequest } from '../models/stock-out-model';

@Injectable({
  providedIn: 'root',
})
export class StockOutService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createStockOut(data: StockOutCreateRequest): Observable<StockOutCreateRequest> {
    const createUrl = `${this.apiUrl}/stock-outs/addStockOut`;

    return this.httpClient.post<StockOutCreateRequest>(createUrl, data);
  }

  getAllStockOuts(): Observable<StockOutCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-outs/getAllStockOuts`;

    return this.httpClient.get<StockOutCreateRequest[]>(getUrl);
  }

  getStockOutById(id: number): Observable<StockOutCreateRequest> {
    const getUrl = `${this.apiUrl}/stock-outs/getStockOutById/${id}`;
    
    return this.httpClient.get<StockOutCreateRequest>(getUrl);
  }

  getStockOutsByStatus(status: string): Observable<StockOutCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-outs/status/${status}`;

    return this.httpClient.get<StockOutCreateRequest[]>(getUrl);
  }

  approveStockOut(id: number): Observable<any> {
    const approveUrl = `${this.apiUrl}/stock-outs/approve/${id}`;

    return this.httpClient.patch(approveUrl, {});
  }

  rejectStockOut(id: number): Observable<any> {
    const rejectUrl = `${this.apiUrl}/stock-outs/reject/${id}`;

    return this.httpClient.patch(rejectUrl, {});
  }
}
