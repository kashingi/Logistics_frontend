import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WarehouseModel } from '../models/warehouse-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createWarehouse(data: WarehouseModel): Observable<any> {
    const createUrl = `${this.apiUrl}/warehouse/addWarehouse`;

    return this.httpClient.post(createUrl, data);
  }

  getAll(): Observable<WarehouseModel[]> {
    const getUrl = `${this.apiUrl}/warehouse/getAllWarehouses`;

    return this.httpClient.get<WarehouseModel[]>(getUrl);
  }

  getById(id: number): Observable<WarehouseModel> {
    const getUrl = `${this.apiUrl}/warehouse/getWarehouseById/${id}`;

    return this.httpClient.get<WarehouseModel>(getUrl);
  }

  updateWarehouse(id: number, data: WarehouseModel): Observable<any> {
    const updateUrl = `${this.apiUrl}/warehouse/updateWarehouse/${id}`;
    
    return this.httpClient.patch(updateUrl, data);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const updateStatusUrl = `${this.apiUrl}/warehouse/updateWarehouseStatus/${id}`;

    return this.httpClient.patch(updateStatusUrl, { status });
  }
}
