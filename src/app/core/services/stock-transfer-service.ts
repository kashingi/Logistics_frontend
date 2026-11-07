import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockTransferCreateRequest } from '../models/stock-transfer-model';

@Injectable({
  providedIn: 'root',
})
export class StockTransferService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createStockTransfer(data: StockTransferCreateRequest): Observable<StockTransferCreateRequest> {
    const createUrl = `${this.apiUrl}/stock-transfers/addStockTransfer`;

    return this.httpClient.post<StockTransferCreateRequest>(createUrl, data);
  }

  getAllStockTransfers(): Observable<StockTransferCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-transfers/getAllStockTransfers`;

    return this.httpClient.get<StockTransferCreateRequest[]>(getUrl);
  }

  getStockTransferById(id: number): Observable<StockTransferCreateRequest> {
    const getUrl = `${this.apiUrl}/stock-transfers/getStockTransferById/${id}`;

    return this.httpClient.get<StockTransferCreateRequest>(getUrl);
  }

  getStockTransfersByStatus(status: string): Observable<StockTransferCreateRequest[]> {
    const getUrl = `${this.apiUrl}/stock-transfers/getStockTransfersByStatus/${status}`;

    return this.httpClient.get<StockTransferCreateRequest[]>(getUrl);
  }

  approveStockTransfer(id: number): Observable<any> {
    const patchUrl = `${this.apiUrl}/stock-transfers/approve/${id}`;

    return this.httpClient.patch(patchUrl, {});
  }

  receiveStockTransfer(id: number): Observable<any> {
    const patchUrl = `${this.apiUrl}/stock-transfers/receive/${id}`;

    return this.httpClient.patch(patchUrl, {});
  }

  cancelStockTransfer(id: number): Observable<any> {
    const patchUrl = `${this.apiUrl}/stock-transfers/cancel/${id}`;
    
    return this.httpClient.patch(patchUrl, {});
  }
}
