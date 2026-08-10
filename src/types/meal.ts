export type MealType = 'breakfast' | 'lunch' | 'afternoon_snack' | 'dinner';
export type Amount = 'small' | 'normal' | 'large';
export type Symptom = 'well' | 'discomfort' | 'pain' | 'severe_pain';

export interface Meal {
  id: string;
  mealType: MealType;
  amount: Amount;
  foods: string[];
  symptom: Symptom;
  notes: string | null;
  mealDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealInput {
  mealType: MealType;
  amount: Amount;
  foods: string[];
  symptom: Symptom;
  notes: string | null;
  mealDate: string;
}

export interface PainHistoryMatch {
  food: string;
  symptom: Symptom;
  mealDate: string;
  mealType: MealType;
}
