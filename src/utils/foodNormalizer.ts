export function normalizeFood(rawFood: string): string {
  return rawFood.trim().replace(/\s+/g, " ").toLowerCase();
}

export function isBlankFood(rawFood: string): boolean {
  return rawFood.trim().length === 0;
}

export function sortFoods(foods: string[]): string[] {
  return [...foods].sort((a, b) => a.localeCompare(b, "pt-BR"));
}
