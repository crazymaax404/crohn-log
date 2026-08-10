import { useQuery } from "@tanstack/react-query";
import { findFoodPainHistory } from "../services/supabase/meals.service";
import { normalizeFood } from "../utils/foodNormalizer";

export function useFoodPainHistoryQuery(
  foods: string[],
  excludeMealId?: string,
) {
  const normalizedKey = foods.map(normalizeFood).sort().join(",");

  return useQuery({
    queryKey: ["foodPainHistory", normalizedKey, excludeMealId ?? null],
    queryFn: () => findFoodPainHistory(foods, excludeMealId),
    enabled: foods.length > 0,
  });
}
