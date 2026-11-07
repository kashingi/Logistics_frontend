import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockInCreateRequest } from '../models/stock-in-model';

@Injectable({
  providedIn: 'root',
})
export class StockInService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createStockIn(data: StockInCreateRequest): Observable<StockInCreateRequest> {
    const createUrl = `${this.apiUrl}/stock-ins/addStockIn`;
    
    return this.httpClient.post<StockInCreateRequest>(createUrl, data);
  }

  getAllStockIns(): Observable<StockInCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-ins/getAllStockIns`;
    return this.httpClient.get<StockInCreateRequest[]>(getUrl);
  }

  getStockInById(id: number): Observable<StockInCreateRequest> {
    const getUrl = `${this.apiUrl}/stock-ins/getStockInById/${id}`;

    return this.httpClient.get<StockInCreateRequest>(getUrl);
  }

  getStockInsByStatus(status: string): Observable<StockInCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-ins/getByStatus/${status}`;

    return this.httpClient.get<StockInCreateRequest[]>(getUrl);
  }

  approveStockIn(id: number): Observable<StockInCreateRequest> {
    const patchUrl = `${this.apiUrl}/stock-ins/approve/${id}`;

    return this.httpClient.patch<StockInCreateRequest>(patchUrl, {});
  }

  rejectStockIn(id: number): Observable<StockInCreateRequest> {
    const patchUrl = `${this.apiUrl}/stock-ins/reject/${id}`;

    return this.httpClient.patch<StockInCreateRequest>(patchUrl, {});
  }
}
