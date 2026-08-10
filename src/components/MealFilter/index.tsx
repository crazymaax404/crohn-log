import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import { SYMPTOM_LABELS, SYMPTOM_ORDER } from '../../constants/labels';
import type { Symptom } from '../../types/meal';

export type MealFilterValue = 'all' | Symptom;

interface MealFilterProps {
  value: MealFilterValue;
  onChange: (value: MealFilterValue) => void;
  counts: Record<MealFilterValue, number>;
}

const FILTER_OPTIONS: { value: MealFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  ...SYMPTOM_ORDER.map((symptom) => ({ value: symptom, label: SYMPTOM_LABELS[symptom] })),
];

export function MealFilter({ value, onChange, counts }: MealFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {FILTER_OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{option.label}</Text>
            <Text style={[styles.chipCount, selected && styles.chipCountSelected]}>
              {counts[option.value] ?? 0}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 10,
    paddingVertical: 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
  },
  chipSelected: {
    backgroundColor: COLORS.selectedDark,
    borderColor: COLORS.selectedDark,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  chipLabelSelected: {
    color: COLORS.surface,
  },
  chipCount: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    overflow: 'hidden',
  },
  chipCountSelected: {
    color: COLORS.surface,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
