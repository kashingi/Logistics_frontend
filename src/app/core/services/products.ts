import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root',
})
export class Products {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  create(data: Product): Observable<Product> {
    const createUrl = `${this.apiUrl}/addProduct`;

    return this.httpClient.post<Product>(createUrl, data);
  }

  getAll(): Observable<any> {
    const getUrl = `${this.apiUrl}/getAllProducts`;

    return this.httpClient.get(getUrl);
  }

  getById(id: number): Observable<any> {
    const getUrl = `${this.apiUrl}/getProductById/${id}`;

    return this.httpClient.get(getUrl);
  }

  getByCategory(categoryId: number): Observable<any> {
    const getUrl = `${this.apiUrl}/getProductsByCategory/${categoryId}`;

    return this.httpClient.get(getUrl);
  }

  getProductByStatus(status: string): Observable<any> {
    const getUrl = `${this.apiUrl}/getProductsByStatus/${status}`;

    return this.httpClient.get(getUrl);
  }

  update(id: number, data: Product): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/updateProduct/${id}`, data);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const updateStatusUrl = `${this.apiUrl}/updateProductStatus/${id}`;

    return this.httpClient.patch(updateStatusUrl, status);
  }

}
