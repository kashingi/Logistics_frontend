import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  //private ordersUrl = `${environment.apiUrl}/v1/api/orders-for-delivery`;
  //private deliveriesUrl = `${environment.apiUrl}/v1/api/deliveries`;

  // ===== Orders for Delivery / Packing =====
  getOrdersForDelivery(dispatchType?: string): Observable<any> {
    const orderUrl = `${environment.apiUrl}/orders-for-delivery`;
    const q = dispatchType ? `?dispatchType=${dispatchType}` : '';
    return this.httpClient.get(`${orderUrl}${q}`);
  }

  getPackingQueue(dispatchType?: string): Observable<any> {
    const orderUrl = `${this.apiUrl}/orders-for-delivery/packing-queue`;
    const q = dispatchType ? `?dispatchType=${dispatchType}` : '';
    return this.httpClient.get(`${orderUrl}${q}`);
  }

  assignRider(salesOrderId: number, riderId: number): Observable<any> {
    const riderUrl = `${this.apiUrl}/orders-for-delivery/${salesOrderId}/assign-rider?riderId=${riderId}`;

    return this.httpClient.post(riderUrl, {});
  }

  confirmLocation(salesOrderId: number, notes?: string): Observable<any> {
    const q = notes ? `?notes=${encodeURIComponent(notes)}` : '';
    const locationUrl = `${this.apiUrl}/${salesOrderId}/orders-for-delivery/confirm-location${q}`;

    return this.httpClient.post(locationUrl, {});
  }

  allocateLot(salesOrderId: number): Observable<any> {
    const lotUrl = `${this.apiUrl}/${salesOrderId}/orders-for-delivery/allocate-lot`;

    return this.httpClient.post(lotUrl, {});
  }

  scanItem(salesOrderId: number, barcode: string): Observable<any> {
    const scanUrl = `${this.apiUrl}/${salesOrderId}/scan?barcode=${encodeURIComponent(barcode)}`;

    return this.httpClient.post(scanUrl, {});
  }

  // ===== Deliveries =====
  getAllDeliveries(deliveryType?: string, status?: string): Observable<any[]> {
    const params: string[] = [];
    const getUrl = `${this.apiUrl}/deliveries/getAllDeliveries`;
    if (deliveryType) params.push(`deliveryType=${deliveryType}`);
    if (status) params.push(`status=${status}`);
    const q = params.length ? `?${params.join('&')}` : '';

    return this.httpClient.get<[]>(`${getUrl}${q}`);
  }

  getDeliveryById(id: number): Observable<any> {
    const getUrl = `${this.apiUrl}/deliveries/getDeliveryById/${id}`;

    return this.httpClient.get(getUrl);
  }

  getInProgress(): Observable<[]> {
    const progressUrl = `${this.apiUrl}/deliveries/getDeliveriesInProgress`;

    return this.httpClient.get<[]>(progressUrl);
  }

  markPicked(id: number): Observable<any> {
    const pickedUrl = `${this.apiUrl}/deliveries/mark-picked/${id}`;

    return this.httpClient.patch(pickedUrl, {});
  }

  markCollected(id: number): Observable<any> {
    const collectUrl = `${this.apiUrl}/deliveries/mark-collected/${id}`
    return this.httpClient.patch(collectUrl, {});
  }

  completeDelivery(id: number): Observable<any> {
    const deliveryUrl = `${this.apiUrl}/deliveries/completeDelivery/${id}`;

    return this.httpClient.patch(deliveryUrl, {});
  }

  cancelDelivery(id: number, reason: string, action: string): Observable<any> {
    const cancelUrl = `${this.apiUrl}/deliveries/cancelDelivery/${id}?reason=${encodeURIComponent(reason)}&action=${action}`;

    return this.httpClient.patch(cancelUrl, {});
  }

  returnDelivery(id: number, reason: string, action: string): Observable<any> {
    const returnUrl = `${this.apiUrl}/deliveries/returnDelivery/return/${id}?reason=${encodeURIComponent(reason)}&action=${action}`;

    return this.httpClient.patch(returnUrl, {});
  }

  // ===== Picking Lists =====
  createPickingList(body: any): Observable<any> {
    const createUrl = `${this.apiUrl}/deliveries/createPickingList`;

    return this.httpClient.post(createUrl, body);
  }

  getPickingLists(deliveryType?: string): Observable<[]> {
    const q = deliveryType ? `?deliveryType=${deliveryType}` : '';
    const pickingUrl = `${this.apiUrl}/deliveries/getPickingLists/picking-lists${q}`;

    return this.httpClient.get<[]>(pickingUrl);
  }

  markPickingListPicked(id: number): Observable<any> {
    const markUrl = `${this.apiUrl}/picking-lists/${id}/mark-picked`;
    return this.httpClient.patch(markUrl, {});
  }
}
