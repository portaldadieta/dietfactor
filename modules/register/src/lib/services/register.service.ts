import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userInfo } from '../interfaces/user-info.interface'
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  static dietFactorURL = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  createUser(userData: userInfo) {
    return this.http.post(`${RegisterService.dietFactorURL}`, userData);
  }
}
