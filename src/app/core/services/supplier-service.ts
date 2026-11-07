import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierModel } from '../models/supplier-model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createSupplier(data: SupplierModel): Observable<SupplierModel> {
    const createUrl = `${this.apiUrl}/supplers/addSupplier`;

    return this.httpClient.post<SupplierModel>(createUrl, data);
  }

  getAll(): Observable<SupplierModel[]> {
    const getUrl = `${this.apiUrl}/supplers/getAllSuppliers`;

    return this.httpClient.get<SupplierModel[]>(getUrl);
  }

  getById(id: number): Observable<SupplierModel> {
    const getUrl = `${this.apiUrl}/supplers/getSupplierById/${id}`;

    return this.httpClient.get<SupplierModel>(getUrl);
  }

  updateSupplier(id: number, data: SupplierModel): Observable<SupplierModel> {
    const updateUrl = `${this.apiUrl}/supplers/updateSupplier/${id}`;

    return this.httpClient.patch<SupplierModel>(updateUrl, data);
  }

  updateStatus(id: number, status: string): Observable<SupplierModel> {
    const updateStatusUrl = `${this.apiUrl}/supplers/updateSupplierStatus/${id}`;

    return this.httpClient.patch<SupplierModel>(updateStatusUrl, { status });
  }
}
