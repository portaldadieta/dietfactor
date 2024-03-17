import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth } from '../interfaces/IAuth.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IResponse } from '../interfaces/IResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient: HttpClient = inject(HttpClient)

  static dietFactorURL = 'http://localhost:3000';

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearToken(): void {
    sessionStorage.removeItem('token');
  }

  login(data: IAuth): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${AuthService.dietFactorURL}/auth/login`, data);
      
  }
}
