import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMeal, deleteMeal, listMeals, updateMeal } from '../services/supabase/meals.service';
import type { MealInput } from '../types/meal';

const MEALS_QUERY_KEY = ['meals'];

export function useMealsQuery() {
  return useQuery({ queryKey: MEALS_QUERY_KEY, queryFn: listMeals });
}

export function useCreateMealMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: MealInput) => createMeal(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEALS_QUERY_KEY }),
  });
}

export function useUpdateMealMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: MealInput }) => updateMeal(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEALS_QUERY_KEY }),
  });
}

export function useDeleteMealMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMeal(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEALS_QUERY_KEY }),
  });
}
