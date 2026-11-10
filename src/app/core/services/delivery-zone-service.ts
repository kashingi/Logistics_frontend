import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryZoneModel } from '../models/delivery-zone-model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryZoneService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createDeliveryZone(data: DeliveryZoneModel): Observable<DeliveryZoneModel> {
    const createUrl = `${this.apiUrl}/delivery-zones/addDeliveryZone`;

    return this.httpClient.post<DeliveryZoneModel>(createUrl, data);
  }

  getAllDeliveryZones(): Observable<DeliveryZoneModel[]> {
    const getUrl = `${this.apiUrl}/delivery-zones/getAllDeliveryZones`;

    return this.httpClient.get<DeliveryZoneModel[]>(getUrl);
  }

  getDeliveryZoneById(id: number): Observable<DeliveryZoneModel> {
    const getUrl = `${this.apiUrl}/delivery-zones/getDeliveryZoneById/${id}`;

    return this.httpClient.get<DeliveryZoneModel>(getUrl);
  }

  getDeliveryZoneByStatus(status: string): Observable<DeliveryZoneModel[]> {
    const getUrl = `${this.apiUrl}/delivery-zones/getDeliveryZonesByStatus/${status}`;

    return this.httpClient.get<DeliveryZoneModel[]>(getUrl);
  }

  updateDeliveryZone(id: number, data: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/delivery-zones/updateDeliveryZone/${id}`;

    return this.httpClient.put(updateUrl, data);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const updateStatusUrl = `${this.apiUrl}/delivery-zones/updateStatus/${id}`;

    return this.httpClient.patch(updateStatusUrl, { status });
  }

  deleteDeliveryZone(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delivery-zones/deleteDeliveryZone/${id}`;

    return this.httpClient.delete(deleteUrl);
  }
}
