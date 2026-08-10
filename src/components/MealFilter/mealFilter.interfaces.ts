import type { Symptom } from "../../types/meal";

export type MealFilterValue = "all" | Symptom;

export interface MealFilterProps {
  value: MealFilterValue;
  onChange: (value: MealFilterValue) => void;
  counts: Record<MealFilterValue, number>;
}
