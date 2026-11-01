import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product';


@Injectable({
  providedIn: 'root',
})
export class Product {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  create(data: ProductModel): Observable<ProductModel> {
    const createUrl = `${this.apiUrl}/products/addProduct`;

    return this.httpClient.post<ProductModel>(createUrl, data);
  }

  getAll(): Observable<ProductModel[]> {
    const getUrl = `${this.apiUrl}/products/getAllProducts`;

    return this.httpClient.get<ProductModel[]>(getUrl);
  }

  getById(id: number): Observable<ProductModel> {
    const getUrl = `${this.apiUrl}/products/getProductById/${id}`;

    return this.httpClient.get<ProductModel>(getUrl);
  }

  getByCategory(categoryId: number): Observable<ProductModel[]> {
    const getUrl = `${this.apiUrl}/products/getProductsByCategory/${categoryId}`;

    return this.httpClient.get<ProductModel[]>(getUrl);
  }

  getProductByStatus(status: string): Observable<ProductModel[]> {
    const getUrl = `${this.apiUrl}/products/getProductsByStatus/${status}`;

    return this.httpClient.get<ProductModel[]>(getUrl);
  }

  update(id: number, data: ProductModel): Observable<ProductModel> {
    const updateUrl = `${this.apiUrl}/products/updateProduct/${id}`;

    return this.httpClient.patch<ProductModel>(updateUrl, data);
  }

  updateStatus(id: number, status: string): Observable<ProductModel> {
    const updateStatusUrl = `${this.apiUrl}/products/updateProductStatus/${id}`;

    return this.httpClient.patch<ProductModel>(updateStatusUrl, { status });
  }

}
