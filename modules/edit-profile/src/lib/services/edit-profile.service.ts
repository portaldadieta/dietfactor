import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@dietfactor/modules/auth';
import { UserInfo } from '../edit-profile/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  static dietFactorURL = Constants.API_URL;

  constructor(private http: HttpClient) { }

  updateUserProfile(userData: UserInfo) {
      console.log(userData);
      return this.http.put<UserInfo>(`${EditProfileService.dietFactorURL}/users/${userData?.id}`, userData);
  }

}
