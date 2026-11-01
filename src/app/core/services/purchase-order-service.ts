import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrderModel } from '../models/purchase-order-model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  create(data: PurchaseOrderModel): Observable<PurchaseOrderModel> {
    const createUrl = `${this.apiUrl}/purchase-orders/addPurchaseOrder`;

    return this.httpClient.post<PurchaseOrderModel>(createUrl, data);
  }

  getAll(): Observable<PurchaseOrderModel[]> {
    const getUrl = `${this.apiUrl}/purchase-orders/getAllPurchaseOrders`;
    
    return this.httpClient.get<PurchaseOrderModel[]>(getUrl);
  }

  getById(id: number): Observable<PurchaseOrderModel> {
    const getByIdUrl = `${this.apiUrl}/purchase-orders/getPurchaseOrderById/${id}`;

    return this.httpClient.get<PurchaseOrderModel>(getByIdUrl);
  }

  approve(id: number): Observable<PurchaseOrderModel> {

    const approveUrl = `${this.apiUrl}/purchase-orders/approve/${id}`;
    return this.httpClient.patch<PurchaseOrderModel>(approveUrl, {});
  }

  reject(id: number): Observable<PurchaseOrderModel> {
    
    const rejectUrl = `${this.apiUrl}/purchase-orders/reject/${id}`;
    return this.httpClient.patch<PurchaseOrderModel>(rejectUrl, {});
  }
}
