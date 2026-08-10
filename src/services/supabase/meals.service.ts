import { supabase } from '../../config/supabase';
import { normalizeFood } from '../../utils/foodNormalizer';
import type { Amount, Meal, MealInput, MealType, PainHistoryMatch, Symptom } from '../../types/meal';

const MEAL_COLUMNS = 'id, meal_type, amount, foods, symptom, notes, meal_date, created_at, updated_at';

interface MealRow {
  id: string;
  meal_type: MealType;
  amount: Amount;
  foods: string[];
  symptom: Symptom;
  notes: string | null;
  meal_date: string;
  created_at: string;
  updated_at: string;
}

function rowToMeal(row: MealRow): Meal {
  return {
    id: row.id,
    mealType: row.meal_type,
    amount: row.amount,
    foods: row.foods,
    symptom: row.symptom,
    notes: row.notes,
    mealDate: row.meal_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mealInputToRow(input: MealInput) {
  return {
    meal_type: input.mealType,
    amount: input.amount,
    foods: input.foods,
    symptom: input.symptom,
    notes: input.notes,
    meal_date: input.mealDate,
  };
}

export async function listMeals(): Promise<Meal[]> {
  const { data, error } = await supabase
    .from('meals')
    .select(MEAL_COLUMNS)
    .order('meal_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as MealRow[]).map(rowToMeal);
}

export async function createMeal(input: MealInput): Promise<Meal> {
  const { data, error } = await supabase
    .from('meals')
    .insert(mealInputToRow(input))
    .select(MEAL_COLUMNS)
    .single();

  if (error) throw error;
  return rowToMeal(data as MealRow);
}

export async function updateMeal(id: string, input: MealInput): Promise<Meal> {
  const { data, error } = await supabase
    .from('meals')
    .update({ ...mealInputToRow(input), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(MEAL_COLUMNS)
    .single();

  if (error) throw error;
  return rowToMeal(data as MealRow);
}

export async function deleteMeal(id: string): Promise<void> {
  const { error } = await supabase.from('meals').delete().eq('id', id);
  if (error) throw error;
}

export async function findFoodPainHistory(
  foods: string[],
  excludeMealId?: string,
): Promise<PainHistoryMatch[]> {
  const normalizedTargets = new Set(foods.map(normalizeFood));
  if (normalizedTargets.size === 0) return [];

  let query = supabase
    .from('meals')
    .select('id, meal_type, foods, symptom, meal_date')
    .in('symptom', ['pain', 'severe_pain'])
    .order('meal_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (excludeMealId) {
    query = query.neq('id', excludeMealId);
  }

  const { data, error } = await query;
  if (error) throw error;

  const matchesByFood = new Map<string, PainHistoryMatch>();

  for (const row of data as Pick<MealRow, 'id' | 'meal_type' | 'foods' | 'symptom' | 'meal_date'>[]) {
    for (const historicalFood of row.foods) {
      const normalizedFood = normalizeFood(historicalFood);
      if (!normalizedTargets.has(normalizedFood) || matchesByFood.has(normalizedFood)) continue;

      matchesByFood.set(normalizedFood, {
        food: historicalFood,
        symptom: row.symptom,
        mealDate: row.meal_date,
        mealType: row.meal_type,
      });
    }
  }

  return Array.from(matchesByFood.values());
}

export async function renameFoodAcrossMeals(
  oldFood: string,
  newFood: string,
  excludeMealId?: string,
): Promise<number> {
  const normalizedOld = normalizeFood(oldFood);
  const meals = await listMeals();
  const affectedMeals = meals.filter(
    (meal) => meal.id !== excludeMealId && meal.foods.some((food) => normalizeFood(food) === normalizedOld),
  );

  for (const meal of affectedMeals) {
    const updatedFoods = meal.foods.map((food) => (normalizeFood(food) === normalizedOld ? newFood : food));
    await updateMeal(meal.id, {
      mealType: meal.mealType,
      amount: meal.amount,
      foods: updatedFoods,
      symptom: meal.symptom,
      notes: meal.notes,
      mealDate: meal.mealDate,
    });
  }

  return affectedMeals.length;
}
