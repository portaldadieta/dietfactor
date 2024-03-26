import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from '../consult-food/interfaces/food.interface';
import { Constants } from '@dietfactor/modules/auth';

@Injectable({
  providedIn: 'root'
})
export class ConsultFoodService {
  static dietFactorURL = Constants.API_URL;

  constructor(private http: HttpClient) {}

  getFoodByAmount(limit: number = 21) {
    return this.http.get<Food[]>(`${ConsultFoodService.dietFactorURL}/foods/?limit=${limit}`) 
  }
}
