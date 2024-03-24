import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../edit-profile/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  static dietFactorURL = 'https://dietfactor.ngrok.app';

  constructor(private http: HttpClient) { }

  updateUserProfile(userData: UserInfo) {
      return this.http.patch<UserInfo>(`${EditProfileService.dietFactorURL}/user/${userData?.id}`, userData);
  }

}
