import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService, Constants } from "@dietfactor/modules/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  static url = Constants.API_URL;
  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  getNutricionalValues(): Observable<IDiet[]> {
    const userId = this.authService.getUserAuthData().user.id;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.authService.getUserAuthData().access_token
    });
    
    return this.http.get<IDiet[]>(`${HomeService.url}/diets/users/${userId}`, { headers: headers });
  }
}

interface IFood {
  fats: number;
  kcal: number;
  name: string;
  carbs: number;
  amount: number;
  protein: number;
}

interface IMeal {
  id: number;
  title: string;
  dietId: number;
  foods: IFood[]
}

interface IDiet {
  id: number;
  title: string;
  objective: string;
  valueObjective: string;
  intensity: string;
  factor: string;
  caloricGoal: string;
  userId: number;
  meals: IMeal[]
}