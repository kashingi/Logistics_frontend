import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiderModel } from '../models/rider-model';

@Injectable({
  providedIn: 'root',
})
export class RiderService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

   createRider(data: RiderModel): Observable<RiderModel> {
    const createUrl = `${this.apiUrl}/riders/addRider`;

    return this.httpClient.post<RiderModel>(createUrl, data);
  }

  getAllRiders(): Observable<RiderModel[]> {
    const getUrl = `${this.apiUrl}/riders/getAllRiders`;

    return this.httpClient.get<RiderModel[]>(getUrl);
  }

  getRiderById(id: number): Observable<RiderModel> {
    const getByIdUrl = `${this.apiUrl}/riders/getRiderById/${id}`;

    return this.httpClient.get<RiderModel>(getByIdUrl);
  }

  getRiderByStatus(status: string): Observable<RiderModel[]> {
    const getByStatusUrl = `${this.apiUrl}/riders/getByStatus/${status}`;

    return this.httpClient.get<RiderModel[]>(getByStatusUrl);
  }

  getAvailableRiders(zoneId?: number): Observable<RiderModel[]> {
    const q = zoneId ? `?zoneId=${zoneId}` : '';

    return this.httpClient.get<RiderModel[]>(`${this.apiUrl}/riders/getAvailableRiders${q}`);
  }

  updateRider(id: number, data: any): Observable<RiderModel> {
    const updateUrl = `${this.apiUrl}/riders/updateRider/${id}`;

    return this.httpClient.patch<RiderModel>(updateUrl, data);
  }

  updateRiderStatus(id: number, status: string): Observable<RiderModel> {
    const statusUrl = `${this.apiUrl}/riders/updateStatus/${id}`;

    return this.httpClient.patch<RiderModel>(statusUrl, {status});
  }
}
