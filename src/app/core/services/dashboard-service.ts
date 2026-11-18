import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  apiUrl = environment.apiUrl;
  
    constructor(private httpClient: HttpClient) { }

    getDashboardSummary(days: number = 30): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/dashboard/summary?days=${days}`).pipe(
      map((resp) => resp?.payLoad)
    );
  }
}
