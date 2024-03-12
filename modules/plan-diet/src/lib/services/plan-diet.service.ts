import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlanDietService {
  static dietFactorURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllFoods() {
    return this.http.get<Food[]>(`${PlanDietService.dietFactorURL}/foods/?limit=100`)
  };
}

interface Food {
  id?: string | number;
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
}
