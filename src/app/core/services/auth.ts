import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signup(signupData: User): Observable<User> {
    const signupUrl = `${this.apiUrl}/auth/signup`;

    return this.httpClient.post<User>(signupUrl, signupData);
  }

  login(loginData: any): Observable<any> {
    const loginUrl = `${this.apiUrl}/auth/login`;

    return this.httpClient.post<any>(loginUrl, loginData);
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

  resetPassword(token: string, newPassword: string): Observable<any> {
    const resetUrl = `${this.apiUrl}/auth/reset-password`;

    return this.httpClient.post(resetUrl, { token, newPassword});
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/change-password`, { currentPassword, newPassword});
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
