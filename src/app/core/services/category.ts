import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category as CategoryModel } from '../models/category';



@Injectable({
  providedIn: 'root',
})
export class Category {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  create(data: CategoryModel): Observable<CategoryModel> {
    const createUrl = `${this.apiUrl}/category/addCategory`;

    return this.httpClient.post<CategoryModel>(createUrl, data);
  }

  getAll(): Observable<CategoryModel[]> {
    const getUrl = `${this.apiUrl}/category/getAllCategories`;

    return this.httpClient.get<CategoryModel[]>(getUrl);
  }

  getById(id: number): Observable<CategoryModel> {
    const getUrl = `${this.apiUrl}/category/getCategoryById/${id}`;

    return this.httpClient.get<CategoryModel>(getUrl);
  }

  getcategoryByStatus(status: string): Observable<CategoryModel[]> {
    const getUrl = `${this.apiUrl}/category/getCategoryByStatus/${status}`;

    return this.httpClient.get<CategoryModel[]>(getUrl);
  }

  update(id: number, data: CategoryModel): Observable<CategoryModel> {
    const updateUrl = `${this.apiUrl}/category/updateCategory/${id}`;

    return this.httpClient.put<CategoryModel>(updateUrl, data);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const updateStatusUrl = `${this.apiUrl}/category/updateCategoryStatus/${id}`;

    return this.httpClient.patch(updateStatusUrl, { status });
  }
}
