import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SalesOrderCreateRequest } from '../models/sales-order-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesOrderService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createSalesOrder(data: SalesOrderCreateRequest): Observable<SalesOrderCreateRequest> {
    const createUrl = `${this.apiUrl}/sales-orders/addSalesOrder`;

    return this.httpClient.post<SalesOrderCreateRequest>(createUrl, data);
  }

  getAllSalesOrders(): Observable<SalesOrderCreateRequest[]> {
    const getUrl = `${this.apiUrl}/sales-orders/getAllSalesOrders`;

    return this.httpClient.get<SalesOrderCreateRequest[]>(getUrl);
  }

  getSalesOrderById(id: number): Observable<SalesOrderCreateRequest> {
    const getUrl = `${this.apiUrl}/sales-orders/getSalesOrderById/${id}`;

    return this.httpClient.get<SalesOrderCreateRequest>(getUrl);
  }

  getSalesOrderByStatus(status: string): Observable<SalesOrderCreateRequest[]> {
    const getUrl = `${this.apiUrl}/sales-orders/getSalesOrdersByStatus/${status}`;

    return this.httpClient.get<SalesOrderCreateRequest[]>(getUrl);
  }

  getPendingSalesOder(): Observable<SalesOrderCreateRequest[]> {
    const pendingUrl = `${this.apiUrl}/sales-orders/getPendingSalesOrders`;

    return this.httpClient.get<SalesOrderCreateRequest[]>(pendingUrl);
  }

  confirmSalesOrder(id: number): Observable<SalesOrderCreateRequest> {
    const confirmUrl = `${this.apiUrl}/sales-orders/confirmSalesOrder/${id}`;

    return this.httpClient.patch<SalesOrderCreateRequest>(confirmUrl, {});
  }

  cancelSalesOrder(id: number): Observable<any> {
    const cancelUrl = `${this.apiUrl}/sales-orders/cancelSalesOrder/${id}`;

    return this.httpClient.patch(cancelUrl, {});
  }

  moveSalesOrderToDispatch(id: number, type: string): Observable<SalesOrderCreateRequest> {
    const dispatchUrl = `${this.apiUrl}/sales-orders/moveToDispatch/${id}?dispatchType=${type}`;

    return this.httpClient.patch<SalesOrderCreateRequest>(dispatchUrl, {});
  }

  moveSalesOrderToCollection(id: number): Observable<SalesOrderCreateRequest> {
    const collectionUrl = `${this.apiUrl}/sales-orders/moveToCollection/${id}`;

    return this.httpClient.patch<SalesOrderCreateRequest>(collectionUrl, {});
  }

  cancelWithCreditNote(id: number, reason?: string): Observable<SalesOrderCreateRequest> {
    const q = reason ? `?reason=${encodeURIComponent(reason)}` : '';

    return this.httpClient.patch<SalesOrderCreateRequest>(`${this.apiUrl}/${id}/ccancelWithCreditNote${q}`, {});
  }
}
