import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '@dietfactor/modules/auth';
import { UserInfo } from '../edit-profile/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  static dietFactorURL = Constants.API_URL;

  constructor(private http: HttpClient) { }

  updateUserProfile(userId: number, userData: UserInfo) {
      console.log(userData);
      return this.http.put<UserInfo>(`${EditProfileService.dietFactorURL}/users/${userId}`, userData);
  }
  uploadImageUser(image: File, id: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);

    const params = new HttpParams().set('id', id);
    return this.http.post(`${EditProfileService.dietFactorURL}/users/profile-image`, formData, {params});
  }

}
