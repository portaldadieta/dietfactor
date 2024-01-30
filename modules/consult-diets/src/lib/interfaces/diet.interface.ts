export interface DietInterface {
    name: string;
  kcal: number;
  goal: 'Bulking' | 'Cutting' | 'Manutenção';
  protein: number;
  carbs: number;
  fat: number;
}