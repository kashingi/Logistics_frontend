import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesQuotationCreateRequest } from '../models/sales-quotation-model';

@Injectable({
  providedIn: 'root',
})
export class SalesQuotationService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createSalesQuotation(data: SalesQuotationCreateRequest): Observable<SalesQuotationCreateRequest> {
    const createUrl = `${this.apiUrl}/sales-quotations/addSalesQuotation`;

    return this.httpClient.post<SalesQuotationCreateRequest>(createUrl, data);
  }

  getAllSalesQuotations(): Observable<SalesQuotationCreateRequest[]> {
    const getUrl = `${this.apiUrl}/sales-quotations/getAllSalesQuotations`;
    
    return this.httpClient.get<SalesQuotationCreateRequest[]>(getUrl);
  }

  getSalesQuotationById(id: number): Observable<SalesQuotationCreateRequest> {
    const getByIdUrl = `${this.apiUrl}/sales-quotations/getSalesQuotationById/${id}`;

    return this.httpClient.get<SalesQuotationCreateRequest>(getByIdUrl);
  }

  getSalesQuotationsByStatus(status: string): Observable<SalesQuotationCreateRequest[]> {
    const getByStatusUrl = `${this.apiUrl}/sales-quotations/getSalesQuotationsByStatus/${status}`;

    return this.httpClient.get<SalesQuotationCreateRequest[]>(getByStatusUrl);
  }

  cancelSalesQuotation(id: number): Observable<any> {
    const cancelUrl = `${this.apiUrl}/sales-quotations/cancelSalesQuotation/${id}`;
    
    return this.httpClient.patch(cancelUrl, {});
  }

  convertToSalesOrder(id: number): Observable<any> {
    const convertUrl = `${this.apiUrl}/sales-quotations/convert-to-sales-order/${id}`;
    
    return this.httpClient.post(convertUrl, {});
  }
}
