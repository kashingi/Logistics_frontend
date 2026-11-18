import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CustomerModel } from '../models/customer-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<CustomerModel[]> {
    const getUrl = `${this.apiUrl}/customers/getAllCustomers`;

    return this.httpClient.get<CustomerModel[]>(getUrl);
  }

  getCustomerById(id: number): Observable<CustomerModel> {
    const getUrl = `${this.apiUrl}/customers/getCustomerById/${id}`;

    return this.httpClient.get<CustomerModel>(getUrl);
  }

  createCustomer(data: CustomerModel): Observable<CustomerModel> {
    const addUrl = `${this.apiUrl}/customers/addCustomer`;

    return this.httpClient.post<CustomerModel>(addUrl, data);
  }

  updateCustomer(id: number, data: CustomerModel): Observable<CustomerModel> {
    const upadetUrl = `${this.apiUrl}/customers/updateCustomer/${id}`;

    return this.httpClient.patch<CustomerModel>(upadetUrl, data);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const statusUrl = `${this.apiUrl}/customers/updateCustomerStatus/${id}`;

    return this.httpClient.patch(statusUrl, { status });
  }
}
