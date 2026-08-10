import { useMutation } from '@tanstack/react-query';
import { findFoodPainHistory } from '../services/supabase/meals.service';

export function useFoodPainHistoryCheck() {
  return useMutation({
    mutationFn: ({ foods, excludeMealId }: { foods: string[]; excludeMealId?: string }) =>
      findFoodPainHistory(foods, excludeMealId),
  });
}
