import type { Meal, MealInput } from "../../types/meal";

export interface MealFormProps {
  initialMeal?: Meal;
  excludeMealId?: string;
  submitLabel: string;
  submitting: boolean;
  onSubmit: (input: MealInput) => void;
}
