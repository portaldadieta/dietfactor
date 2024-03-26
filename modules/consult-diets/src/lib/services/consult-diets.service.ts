import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@dietfactor/modules/auth';
import { Constants } from '@dietfactor/modules/auth';
import { Observable } from 'rxjs';
@Injectable()
export class ConsultDietsService {
authService: AuthService = inject(AuthService);
constructor(private http: HttpClient) { }

getDietsById(): Observable<any>{
    const headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.authService.getUserAuthData().access_token
      });
    return this.http.get(`${Constants.API_URL}/diets/users/${this.authService.getUserAuthData().user.id}`, {headers})
}

}
