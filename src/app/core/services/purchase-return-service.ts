import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PurchaseReturnCreateRequest } from '../models/purchase-return-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseReturnService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createPurchaReturn(data: PurchaseReturnCreateRequest): Observable<PurchaseReturnCreateRequest> {
    const createUrl = `${this.apiUrl}/purchase-returns/addPurchaseReturn`;
    
    return this.httpClient.post<PurchaseReturnCreateRequest>(createUrl, data);
  }

  getAllPurchaseReturns(): Observable<PurchaseReturnCreateRequest[]> {
    const getUrl = `${this.apiUrl}/purchase-returns/getAllPurchaseReturns`;

    return this.httpClient.get<PurchaseReturnCreateRequest[]>(getUrl);
  }

  getPurchaseReturnById(id: number): Observable<PurchaseReturnCreateRequest> {
    const getUrl = `${this.apiUrl}/purchase-returns/getPurchaseReturnById/${id}`;

    return this.httpClient.get<PurchaseReturnCreateRequest>(getUrl);
  }

  getPurchaseReturnByStatus(status: string): Observable<PurchaseReturnCreateRequest[]> {
    const getUrl = `${this.apiUrl}/purchase-returns/getPurchaseReturnsByStatus/${status}`;

    return this.httpClient.get<PurchaseReturnCreateRequest[]>(getUrl);
  }

  approvePurchaseReturn(id: number): Observable<PurchaseReturnCreateRequest> {
    const approveUrl = `${this.apiUrl}/purchase-returns/approve/${id}`;

    return this.httpClient.patch<PurchaseReturnCreateRequest>(approveUrl, {});
  }

  rejectPurchaseReturn(id: number): Observable<PurchaseReturnCreateRequest> {
    const rejectUrl = `${this.apiUrl}/purchase-returns/reject/${id}`;
    
    return this.httpClient.patch<PurchaseReturnCreateRequest>(rejectUrl, {});
  }
}
