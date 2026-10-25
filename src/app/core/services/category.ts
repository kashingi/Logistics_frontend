import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class Category {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  create(data: Category): Observable<Category> {
    const createUrl = `${this.apiUrl}/addCategory`;

    return this.httpClient.post<Category>(createUrl, data);
  }

  getAll(): Observable<Category[]> {
    const getUrl = `${this.apiUrl}/getAllCategories`;

    return this.httpClient.get<Category[]>(getUrl);
  }

  getById(id: number): Observable<Category> {
    const getUrl = `${this.apiUrl}/getCategoryById/${id}`;

    return this.httpClient.get<Category>(getUrl);
  }

  getcategoryByStatus(status: string): Observable<Category[]> {
    const getUrl = `${this.apiUrl}/getCategoryByStatus/${status}`;

    return this.httpClient.get<Category[]>(getUrl);
  }

  update(id: number, data: Category): Observable<Category> {
    const updateUrl = `${this.apiUrl}/updateCategory/${id}`;

    return this.httpClient.put<Category>(updateUrl, data);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const updateStatusUrl = `${this.apiUrl}/updateCategoryStatus/${id}`;

    return this.httpClient.patch(updateStatusUrl, status);
  }
}
