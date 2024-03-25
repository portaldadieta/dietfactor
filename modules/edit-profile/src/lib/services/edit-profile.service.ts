import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../edit-profile/interfaces/user.interface';
import { Constants } from 'modules/constants';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  static dietFactorURL = Constants.API_URL;

  constructor(private http: HttpClient) { }

  updateUserProfile(userData: UserInfo) {
      return this.http.patch<UserInfo>(`${EditProfileService.dietFactorURL}/user/${userData?.id}`, userData);
  }

}
