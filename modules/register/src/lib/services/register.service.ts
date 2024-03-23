import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { userInfo } from '../interfaces/user-info.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  static dietFactorURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createUser(userData: userInfo) {
    return this.http.post(`${RegisterService.dietFactorURL}/users`, userData);
  }
  uploadImageUser(image: File, id: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);

    const params = new HttpParams().set('id', id);
    return this.http.post(`${RegisterService.dietFactorURL}/users/profile-image`, formData, {params});
  }
}
