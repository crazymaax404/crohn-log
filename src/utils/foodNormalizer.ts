export function normalizeFood(rawFood: string): string {
  return rawFood.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function isBlankFood(rawFood: string): boolean {
  return rawFood.trim().length === 0;
}
