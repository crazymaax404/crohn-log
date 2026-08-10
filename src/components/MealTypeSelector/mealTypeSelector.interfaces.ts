import type { MealType } from "../../types/meal";

export interface MealTypeSelectorProps {
  value: MealType;
  onChange: (mealType: MealType) => void;
}
