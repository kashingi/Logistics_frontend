import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrnCreateRequest, GrnModel } from '../models/grn-model';

@Injectable({
  providedIn: 'root',
})
export class GrnService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createGRN(data: GrnCreateRequest): Observable<GrnCreateRequest> {
    const createUrl = `${this.apiUrl}/goods-received-notes/addGrn`;

    return this.httpClient.post<GrnCreateRequest>(createUrl, data);
  }

  getAllGRNs(): Observable<GrnModel[]> {
    const getUrl = `${this.apiUrl}/goods-received-notes/getAllGrns`;
    
    return this.httpClient.get<GrnModel[]>(getUrl);
  }

  getGRNById(id: number): Observable<GrnModel> {
    const getUrl = `${this.apiUrl}/goods-received-notes/getGrnById/${id}`;

    return this.httpClient.get<GrnModel>(getUrl);
  }

  getGRNByStatus(status: string): Observable<any> {
    const getUrl = `${this.apiUrl}/goods-received-notes/getByStatus/${status}`;

    return this.httpClient.get(getUrl);
  }

  approveGRN(id: number): Observable<any> {
    const approveUrl = `${this.apiUrl}/goods-received-notes/approve/${id}`;

    return this.httpClient.patch(approveUrl, {});
  }
}
