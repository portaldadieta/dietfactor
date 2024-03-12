import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../edit-profile/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  static dietFcatorURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  updateUserProfile(userId:number, userData: UserInfo) {
      return this.http.put<UserInfo>(`${EditProfileService.dietFcatorURL}/user/`, {
        id: userId,
        editUserDto: userData
      });
  }

}
