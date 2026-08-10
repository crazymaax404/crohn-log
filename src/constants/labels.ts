import type { Ionicons } from '@expo/vector-icons';
import type { Amount, MealType, Symptom } from '../types/meal';

type IoniconName = keyof typeof Ionicons.glyphMap;

export const MEAL_TYPE_ORDER: MealType[] = ['breakfast', 'lunch', 'afternoon_snack', 'dinner'];

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Café da manhã',
  lunch: 'Almoço',
  afternoon_snack: 'Café da tarde',
  dinner: 'Jantar',
};

export const AMOUNT_ORDER: Amount[] = ['small', 'normal', 'large'];

export const AMOUNT_LABELS: Record<Amount, string> = {
  small: 'Pouco',
  normal: 'Normal',
  large: 'Muito',
};

export const SYMPTOM_ORDER: Symptom[] = ['well', 'discomfort', 'pain', 'severe_pain'];

export const SYMPTOM_LABELS: Record<Symptom, string> = {
  well: 'Ficou bem',
  discomfort: 'Incômodo',
  pain: 'Dor',
  severe_pain: 'Muita dor',
};

export const SYMPTOM_SEVERITY: Record<Symptom, number> = {
  well: 0,
  discomfort: 1,
  pain: 2,
  severe_pain: 3,
};

export const SYMPTOM_ICONS: Record<Symptom, IoniconName> = {
  well: 'happy-outline',
  discomfort: 'alert-circle-outline',
  pain: 'warning-outline',
  severe_pain: 'flame-outline',
};

export const SYMPTOM_COLORS: Record<Symptom, string> = {
  well: '#0f9d6c',
  discomfort: '#b7860b',
  pain: '#c0392b',
  severe_pain: '#c0392b',
};

export const SYMPTOM_BACKGROUND_COLORS: Record<Symptom, string> = {
  well: '#e3f7ee',
  discomfort: '#fdf3d6',
  pain: '#fbe4e2',
  severe_pain: '#fbe4e2',
};

export const isPainfulSymptom = (symptom: Symptom): boolean =>
  symptom === 'pain' || symptom === 'severe_pain';
