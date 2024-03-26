import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuth } from '../interfaces/IAuth.interface';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/IResponse.interface';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpClient: HttpClient = inject(HttpClient)

  static dietFactorURL = Constants.API_URL;

  setUserAuthData(data: IResponse): void {
    const { access_token: token, user } = data;

    localStorage.setItem('token', token);
    localStorage.setItem('user-data', JSON.stringify(user));
  }

  getUserAuthData(): IResponse {
    return {
      user: JSON.parse(localStorage.getItem('user-data')!),
      access_token: localStorage.getItem('token')!,
    } 
  }

  clearUserDataAndToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-data');
  }


  login(data: IAuth): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${AuthService.dietFactorURL}/auth/login`, data);   
  }
}
