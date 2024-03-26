import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@dietfactor/modules/auth';
import { Constants } from '@dietfactor/modules/auth';


@Injectable({
  providedIn: 'root'
})
export class PlanDietService {
  static dietFactorURL = Constants.API_URL;
  authService: AuthService = inject(AuthService);
  constructor(private http: HttpClient) { }

  getAllFoods() {
    return this.http.get<Food[]>(`${PlanDietService.dietFactorURL}/foods/?limit=100`)
  };
  createDiet(diet: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.authService.getUserAuthData().access_token
    });
    return this.http.post(`${PlanDietService.dietFactorURL}/diets`, diet, {headers: headers});
  }
  createMeal(meal: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.authService.getUserAuthData().access_token
    });
    return this.http.post(`${PlanDietService.dietFactorURL}/meals`, meal, {headers: headers});
  }
}

interface Food {
  id?: string | number;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
}
