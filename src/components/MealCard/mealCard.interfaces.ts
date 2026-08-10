import type { Meal } from "../../types/meal";

export interface MealCardProps {
  meal: Meal;
  onPress: () => void;
}
