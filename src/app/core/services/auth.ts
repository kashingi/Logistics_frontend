import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TokenUser, User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(signupData: User): Observable<User> {
    const signupUrl = `${this.apiUrl}/auth/signup`;

    return this.httpClient.post<User>(signupUrl, signupData);
  }

  login(loginData: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/auth/login`;

    return this.httpClient.post<any>(loginUrl, loginData).pipe(tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  verifyEmail(token: string): Observable<any> {
    const verifyEmailUrl = `${this.apiUrl}/auth/verify-email?token=${token}`;

    return this.httpClient.post(verifyEmailUrl, {});
  }

  resendVerificationToken(email: string): Observable<any> {
    const resendUrl = `${this.apiUrl}/auth/resend-verificationToken`;

    return this.httpClient.post(resendUrl, { email });
  }

  forgotPassword(email: string): Observable<any> {
    const forgotUrl = `${this.apiUrl}/auth/forgot-password`;

    return this.httpClient.post(forgotUrl, { email });
  }

  resetPassword(resetData: any): Observable<any> {
    const resetUrl = `${this.apiUrl}/auth/reset-password`;

    return this.httpClient.post(resetUrl, resetData);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/change-password`, { currentPassword, newPassword });
  }

  getUserDetails(): TokenUser | null {
    if (typeof localStorage === 'undefined') return null;

    const token = localStorage.getItem('token');

    if (!token) return null;

    const payload = token.split('.')[1];
    if (!payload) return null;

    const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = base64Payload.padEnd(Math.ceil(base64Payload.length / 4) * 4, '=');
    return JSON.parse(atob(paddedPayload)) as TokenUser;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
